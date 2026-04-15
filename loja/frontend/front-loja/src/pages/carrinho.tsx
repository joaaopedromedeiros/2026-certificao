import { useEffect, useState } from "react";
import api from "../services/api";
import type { Carrinho } from "../interfaces/carrinho";
import { Link } from "react-router-dom";

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState<Carrinho | null>(null);

  const carregarCarrinho = async () => {
    try {
      const res = await api.get("/loja/carrinho");
      setCarrinho(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const removerItem = async (produto_id: number) => {
    await api.delete(`/loja/carrinho/remove/${produto_id}`);
    carregarCarrinho(); 
  };

  const atualizarQuantidade = async (
    produto_id: number,
    quantidade: number
  ) => {
    if (quantidade <= 0) {
      await removerItem(produto_id);
      return;
    }

    try {
      await api.put("/loja/carrinho/update", {
        produto_id,
        quantidade,
      });

      carregarCarrinho();
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.detail;

      if (status === 400 && message === "Estoque insuficiente") {
        alert("❌ Estoque insuficiente para essa quantidade!");
        return;
      }

      if (status === 401) {
        alert("Você precisa estar logado");
        return;
      }

      alert("Erro ao atualizar quantidade");
    }
  };

  if (!carrinho) return <p>Carregando...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>

      {carrinho.itens.length === 0 && (
        <p className="text-gray-500">Carrinho vazio</p>
      )}

      {carrinho.itens.map((item) => (
        <div
          key={item.produto_id}
          className="border p-4 mb-3 rounded-lg shadow flex justify-between items-center"
        >
          {/* Info */}
          <div>
            <h2 className="font-bold"><Link to={`/produto/${item.produto_id}`}> {item.nome} </Link></h2>
            <p className="text-gray-600">R$ {item.preco}</p>
          </div>
          {/* Quantidade */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                atualizarQuantidade(item.produto_id, item.quantidade - 1)
              }
              className="bg-gray-300 px-2 rounded"
            >
              -
            </button>

            <span>{item.quantidade}</span>

            <button
              onClick={() =>
                atualizarQuantidade(item.produto_id, item.quantidade + 1)
              }
              className="bg-gray-300 px-2 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removerItem(item.produto_id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            X
          </button>
        </div>
      ))}

      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">
          Total: R$ {carrinho.total}
        </h2>
      </div>
    </div>
  );
}