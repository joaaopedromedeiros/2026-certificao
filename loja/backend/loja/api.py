from ninja import Router
from .models import Produto, Carrinho, ItemCarrinho
from .schemas import ProdutoOut, CarrinhoOut, ItemCarrinhoOut, AddCarrinhoIn
from users.auth import JWTAuth
from ninja import File, Form
from ninja.files import UploadedFile
from ninja.errors import HttpError

router = Router(tags=["Loja"])


# ENDPOINTS DE CRUD DOS PRODUTOS

# LISTAR PRODUTOS
@router.get("/produtos", response=list[ProdutoOut])
def listar_produtos(request):
    return Produto.objects.all()



# DETALHE PRODUTO
@router.get("/produtos/{produto_id}", response=ProdutoOut)
def detalhe_produto(request, produto_id: int):
    produto = Produto.objects.get(id=produto_id)
    return produto


@router.post("/produtos", auth=JWTAuth(), response=ProdutoOut)
def criar_produto(
    request,
    nome: str = Form(...),
    descricao: str = Form(...),
    preco: float = Form(...),
    estoque: int = Form(...),
    imagem: UploadedFile = File(...)
):
    user = request.auth

    produto = Produto.objects.create(
        nome=nome,
        descricao=descricao,
        preco=preco,
        estoque=estoque,
        imagem=imagem
    )

    return produto


@router.patch("/produtos/{produto_id}", auth=JWTAuth(), response=ProdutoOut)
def editar_produto(
    request,
    produto_id: int,
    nome: str = Form(None),
    descricao: str = Form(None),
    preco: float = Form(None),
    estoque: int = Form(None),
    imagem: UploadedFile = File(None),
):
    user = request.auth

    try:
        produto = Produto.objects.get(id=produto_id)
    except Produto.DoesNotExist:
        raise HttpError(404, "Produto não encontrado")

    # atualiza apenas o que foi enviado
    if nome is not None:
        produto.nome = nome

    if descricao is not None:
        produto.descricao = descricao

    if preco is not None:
        produto.preco = preco

    if estoque is not None:
        produto.estoque = estoque

    if imagem is not None:
        produto.imagem = imagem

    produto.save()

    return produto


# PEGAR OU CRIAR CARRINHO
def get_or_create_carrinho(user):
    carrinho, _ = Carrinho.objects.get_or_create(usuario=user)
    return carrinho

# VER CARRINHO
@router.get("/carrinho", auth=JWTAuth(), response=CarrinhoOut)
def ver_carrinho(request):
    user = request.auth
    carrinho = get_or_create_carrinho(user)

    itens = []
    total = 0

    for item in ItemCarrinho.objects.filter(carrinho=carrinho):
        subtotal = item.quantidade * item.produto.preco
        total += subtotal

        itens.append({
            "produto_id": item.produto.id,
            "nome": item.produto.nome,
            "preco": item.produto.preco,
            "quantidade": item.quantidade
        })

    return {
        "itens": itens,
        "total": total
    }

# ADICIONAR AO CARRINHO
@router.post("/carrinho/add", auth=JWTAuth(), response={200: dict, 400: dict, 404: dict})
def adicionar_carrinho(request, payload: AddCarrinhoIn):
    user = request.auth
    carrinho = get_or_create_carrinho(user)

    produto = Produto.objects.get(id=payload.produto_id)

    if produto.estoque < payload.quantidade:
        return 400, {"detail": "Estoque insuficiente"}

    item, created = ItemCarrinho.objects.get_or_create(
        carrinho=carrinho,
        produto=produto
    )

    if not created:
        nova_qtd = item.quantidade + payload.quantidade

        if nova_qtd > produto.estoque:
            return 400, {"detail": "Quantidade excede estoque"}

        item.quantidade = nova_qtd
    else:
        item.quantidade = payload.quantidade

    item.save()

    return {"detail": "Produto adicionado ao carrinho"}

# Remover do carinho
@router.delete("/carrinho/remove/{produto_id}", auth=JWTAuth(), response={200: dict, 404: dict})
def remover_item(request, produto_id: int):
    user = request.auth
    carrinho = get_or_create_carrinho(user)
    if not carrinho:
        return 404, {"detail": "Carrinho vazio"}

    deleted, _ = ItemCarrinho.objects.filter(
        carrinho=carrinho,
        produto_id=produto_id
    ).delete()

    if deleted == 0:
        return 404, {"detail": "Item não encontrado"}

    return {"detail": "Item removido com sucesso"}


@router.put("/carrinho/update", auth=JWTAuth(), response={200: dict, 400: dict, 404: dict})
def atualizar_item(request, payload: AddCarrinhoIn):
    user = request.auth
    carrinho = get_or_create_carrinho(user)

    try:
        item = ItemCarrinho.objects.get(
            carrinho=carrinho,
            produto_id=payload.produto_id
        )
    except ItemCarrinho.DoesNotExist:
        return 404, {"detail": "Item não encontrado"}

    produto = item.produto

    if payload.quantidade > produto.estoque:
        return 400, {"detail": "Estoque insuficiente"}

    if payload.quantidade <= 0:
        item.delete()
        return {"detail": "Item removido"}

    item.quantidade = payload.quantidade
    item.save()

    return {"detail": "Quantidade atualizada"}

