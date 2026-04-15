import { useEffect, useState } from "react";
import api from "../services/api";
import type { Produto } from "../interfaces/produto";
import ProdutoCard from "../components/produtocard";

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    api
      .get("/loja/produtos")
      .then((res) => setProdutos(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bem-vindo à Loja 🛒
        </h1>
        <p className="text-lg md:text-xl text-gray-100">
          Os melhores produtos com os melhores preços para você.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Produtos 
          </h2>

          <span className="text-sm text-gray-500">
            {produtos.length} produtos disponíveis
          </span>
        </div>

        {/* GRID PRODUTOS */}
        {produtos.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Nenhum produto encontrado
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}