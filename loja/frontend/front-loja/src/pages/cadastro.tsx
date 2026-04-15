import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastro } from "../services/auth";

export default function Cadastro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      await cadastro(username, email, password, nomeCompleto);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Erro no cadastro");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2"
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2"
      />

      <input
        placeholder="Nome completo"
        onChange={(e) => setNomeCompleto(e.target.value)}
        className="border p-2 mb-2"
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2"
      />

      <button
        onClick={handleCadastro}
        className="bg-green-500 text-white px-4 py-2"
      >
        Cadastrar
      </button>
    </div>
  );
}