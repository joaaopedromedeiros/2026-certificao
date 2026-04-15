import type { Produto } from "../interfaces/produto";
import { Link } from "react-router-dom";
import api from "../services/api";

interface Props {
  produto: Produto;
}

export default function ProdutoCard({ produto }: Props) {

  const adicionarCarrinho = async () => {
    try {
      await api.post("/loja/carrinho/add", {
        produto_id: produto.id,
        quantidade: 1,
      });

      alert("Adicionado ao carrinho!");
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.detail;

      if (status === 401) {
        alert("Você precisa estar logado para adicionar ao carrinho!");
        return;
      }

      if (status === 400 && message === "Estoque insuficiente") {
        alert("❌ Estoque insuficiente para esse produto!");
        return;
      }

      alert("Erro ao adicionar ao carrinho");
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow">
      <img src={`http://127.0.0.1:8000${produto.imagem}`} alt={produto.nome} />
      <h2 className="text-lg font-bold">{produto.nome}</h2>
      <p>R$ {produto.preco}</p>
      <p>Quantidade no estoque: {produto.estoque} </p>

      <div className="flex gap-2">
        <button
          onClick={adicionarCarrinho}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Adicionar
        </button>
        <Link
          to={`/produto/${produto.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}