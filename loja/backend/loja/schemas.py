from ninja import Schema

# PRODUTO (schem)
class ProdutoOut(Schema):
    id: int
    nome: str
    descricao: str
    preco: float
    estoque: int
    imagem: str

# Schmas do carrinho

class ItemCarrinhoOut(Schema):
    produto_id: int
    nome: str
    preco: float
    quantidade: int

class CarrinhoOut(Schema):
    itens: list[ItemCarrinhoOut]
    total: float

# INPUT (Carrinho)
class AddCarrinhoIn(Schema):
    produto_id: int
    quantidade: int = 1