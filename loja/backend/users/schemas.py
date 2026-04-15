from ninja import Schema


# =========================
# CADASTRO
# =========================
class CadastroIn(Schema):
    username: str
    email: str
    password: str
    nome_completo: str


# =========================
# LOGIN
# =========================
class LoginIn(Schema):
    username: str
    password: str


# =========================
# RESPONSE (SEGURANÇA)
# =========================
class SobreMimOut(Schema):
    id: int
    username: str
    email: str
    nome_completo: str