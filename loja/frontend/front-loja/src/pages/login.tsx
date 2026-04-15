import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/");
    } catch {
      alert("Erro no login");
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
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Login
      </button>
      <p className="mt-4 text-sm">
        Não possui uma conta?{" "}
        <span
          onClick={() => navigate("/cadastro")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Cadastre-se
        </span>
      </p>
    </div>
  );
}