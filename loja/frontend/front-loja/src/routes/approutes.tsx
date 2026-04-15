import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Carrinho from "../pages/carrinho";
import Login from "../pages/login";
import PrivateRoute from "./privateroutes";
import ProdutoDetalhe from "../pages/detalheproduto";
import Cadastro from "../pages/cadastro"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produto/:id" element={<ProdutoDetalhe />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/carrinho"
        element={
          <PrivateRoute>
            <Carrinho />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}