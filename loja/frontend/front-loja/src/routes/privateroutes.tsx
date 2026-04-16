import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

interface Props {
  children: React.ReactNode;
} // Esse componente pode receber qualquer coisa que o React consiga renderizar dentro dele. Permite eu passar várias coisas como filhos(as)

export default function PrivateRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  } // Ele retorna isso caso não esteja autenticado, se tiver ele retorna tudo que for "filho(a) da tag PrivateRoute"

  return children;
}