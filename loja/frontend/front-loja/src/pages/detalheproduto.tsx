import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import type { Produto } from "../interfaces/produto";

export default function ProdutoDetalhe() {
  const { id } = useParams();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const res = await api.get<Produto>(`loja/produtos/${id}`);
        setProduto(res.data);
      } catch (err) {
        console.error("Erro ao buscar produto", err);
      } finally {
        setLoading(false);
      }
    }

    carregarProduto();
  }, [id]);

  if (loading) {
    return <p className="p-4">Carregando...</p>;
  }

  if (!produto) {
    return <p className="p-4">Produto não encontrado</p>;
  }
  
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Imagem */}
        <div className="bg-gray-100 rounded-lg flex items-center justify-center h-80">
          {produto.imagem ? (
            <img
              src={`http://127.0.0.1:8000${produto.imagem}`}
              alt={produto.nome}
              className="object-cover h-full w-full rounded-lg"
            />
          ) : (
            <span className="text-gray-500">Sem imagem</span>
          )}
        </div>

        {/* Infos */}
        <div>
          <h1 className="text-2xl font-bold mb-4">
            {produto.nome}
          </h1>

          <p className="text-gray-600 mb-6">
            {produto.descricao}
          </p>

          <p className="text-xl font-semibold text-green-600 mb-6">
            R$ {produto.preco}
          </p>

          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={adicionarCarrinho}>
            Adicionar ao carrinho
          </button>
        </div>

      </div>
    </div>
  );
}