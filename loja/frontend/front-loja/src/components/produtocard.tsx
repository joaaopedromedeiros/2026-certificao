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
    <div className="border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      <img
        src={`https://2026-certificao-six.vercel.app${produto.imagem}`}
        alt={produto.nome}
        className="w-full h-48 sm:h-56 object-cover"
      />

      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
        <h2 className="text-base sm:text-lg font-bold line-clamp-2">
          {produto.nome}
        </h2>

        <p className="text-sm sm:text-base text-gray-700">
          R$ {produto.preco}
        </p>

        <p className="text-xs sm:text-sm text-gray-500">
          Estoque: {produto.estoque}
        </p>

        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <button
            onClick={adicionarCarrinho}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Adicionar
          </button>

          <Link
            to={`/produto/${produto.id}`}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded text-center w-full sm:w-auto"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}