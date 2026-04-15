import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
}