# 🛒 Loja de Produtos — Full Stack (React + FastAPI/Django)

Projeto de uma loja virtual com carrinho de compras, autenticação e gerenciamento de produtos, desenvolvido com arquitetura **frontend + backend separados**.

---

## 🚀 Funcionalidades

* Cadastro de usuário
* Login / Logout com autenticação JWT
* Listagem de produtos
* Detalhamento de produto
* Adição de produtos ao carrinho
* Atualização do carrinho de compras
* SPA (Single Page Application)
* Upload e armazenamento de mídia de produtos

---

## 🧰 Tecnologias utilizadas (Algumas)

### Frontend

* React
* TypeScript
* Tailwind CSS
* React Router
* Axios

### Backend

* Python
* PostgreSQL
* JWT

### Infraestrutura e serviços

* Vercel
* Render
* Cloudflare (R2 Storage)

---

## 📁 Estrutura do projeto

### 🖥️ Frontend

```
src/
 ├── assets/
 ├── components/
 │    ├── navbar.tsx
 │    └── productcard.tsx
 ├── interfaces/
 │    ├── carrinho.ts
 │    └── produto.ts
 ├── pages/
 │    ├── cadastro.tsx
 │    ├── carrinho.tsx
 │    ├── detalheproduto.tsx
 │    ├── home.tsx
 │    └── login.tsx
 ├── routes/
 │    ├── approutes.tsx
 │    └── privateroutes.tsx
 ├── services/
 │    ├── api.ts
 │    └── auth.ts
 ├── App.tsx
 ├── App.css
 ├── main.tsx
 ├── index.css
 └── index.html
```

---

### ⚙️ Backend

```
backend/
 ├── loja/
 │    ├── api.py
 │    ├── app.py
 │    ├── models.py
 │    ├── schemas.py
 │    ├── loja_backend/
 │    │    ├── asgi.py
 │    │    ├── settings.py
 │    │    ├── urls.py
 │    │    └── wsgi.py
 │    ├── migrations/
 │    └── __init__.py
 │
 ├── users/
 │    ├── api.py
 │    ├── apps.py
 │    ├── auth.py
 │    ├── jwt_utils.py
 │    ├── models.py
 │    ├── schemas.py
 │    ├── migrations/
 │    └── __init__.py
 │
 └── media/
      └── produtos/
```

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)** para:

* Login seguro de usuários
* Proteção de rotas privadas
* Controle de sessão no frontend

---

## 🧩 Arquitetura

* Frontend em SPA consumindo API REST
* Backend separado em módulos (users + loja)
* Comunicação via HTTP com Axios
* Autenticação stateless com JWT
* Upload de imagens armazenado no Cloudflare R2

---

## 🌐 Projeto em execução


### 🖥️ Frontend (Aplicação Web)

🔗 [https://2026-certificao-six.vercel.app/](https://2026-certificao-six.vercel.app/)

### ⚙️ Backend (API + Documentação)

🔗 [https://two026-certificao-3.onrender.com/api/docs#/Loja/loja_api_listar_produtos](https://two026-certificao-3.onrender.com/api/docs#/Loja/loja_api_listar_produtos)



## 📦 Deploy

* Frontend: Vercel
* Backend: Render
* Storage: Cloudflare (R2)


