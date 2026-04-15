import os
import django

# 🔧 CONFIGURA O DJANGO
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "loja_backend.settings")
django.setup()

from django.core.management import call_command
from loja.models import Produto


def rodar_migrations():
    print("⚙️ Rodando makemigrations...")
    call_command("makemigrations")

    print("⚙️ Rodando migrate...")
    call_command("migrate")


def popular():
    produtos = [
        {
            "nome": "Notebook Dell",
            "descricao": "Notebook potente para estudos",
            "preco": 3500.00,
            "estoque": 10,
        },
        {
            "nome": "Mouse Gamer",
            "descricao": "Mouse RGB top",
            "preco": 150.00,
            "estoque": 20,
        },
        {
            "nome": "Teclado Mecânico",
            "descricao": "Switch azul",
            "preco": 250.00,
            "estoque": 15,
        },
    ]

    for p in produtos:
        Produto.objects.get_or_create(
            nome=p["nome"],
            defaults=p
        )

    print("✅ Banco populado com sucesso!")


if __name__ == "__main__":
    rodar_migrations()
    popular()