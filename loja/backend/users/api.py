from ninja import Router
from django.contrib.auth import authenticate
from .auth import JWTAuth
from .jwt_utils import generate_jwt
from .models import Usuario
from .schemas import (
    CadastroIn,
    LoginIn,
    SobreMimOut,
)

router = Router(tags=["Autenticação"])



# Login
@router.post("/login", response={200: dict, 401: dict})
def login(request, payload: LoginIn):
    user = authenticate(
        request,
        username=payload.username,
        password=payload.password
    )

    if not user:
        return 401, {"detail": "Credenciais inválidas"}

    token = generate_jwt(user)

    return {
        "access_token": token,
        "token_type": "bearer"
    }



# Cadastro

@router.post("/cadastro", response={200: SobreMimOut, 400: dict})
def cadastro(request, payload: CadastroIn):

    if Usuario.objects.filter(username=payload.username).exists():
        return 400, {"detail": "Username já existe"}
    if Usuario.objects.filter(email=payload.email).exists():
        return 400, {"detail": "Email já cadastrado"}

    user = Usuario.objects.create_user(
        username=payload.username,
        email=payload.email,
        password=payload.password,
        nome_completo=payload.nome_completo,
    )

    return user

# SobreMim (Teste de rota protegida)
@router.get("/me", auth=JWTAuth(), response={200: SobreMimOut})
def me(request):
    user = request.auth

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "nome_completo": user.nome_completo
    }