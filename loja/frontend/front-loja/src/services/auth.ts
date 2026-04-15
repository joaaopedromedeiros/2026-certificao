import api from "./api";

export async function login(username: string, password: string) {
  const res = await api.post("/users/login", {
    username,
    password,
  });

  const token = res.data.access_token;

  localStorage.setItem("token", token);

  return token;
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

export function logout() {
  localStorage.clear();
}


