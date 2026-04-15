import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { isAuthenticated } from "../services/auth";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold"><Link to="/">Loja</Link></h1>

      <div className="flex gap-4 items-center">
        <Link to="/carrinho">Carrinho</Link>
        
        {!isAuthenticated() && (
          <Link to="/login">Entrar</Link>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}