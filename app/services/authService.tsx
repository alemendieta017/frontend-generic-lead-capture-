"use client";
import config from "../config/config";

interface LoginResponse {
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

const login = async (data: LoginData): Promise<{ token: string }> => {
  const response = await fetch(`${config.API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error en el inicio de sesión");
  }

  const loginResponse: LoginResponse = await response.json();

  return { token: loginResponse.token };
};

const register = async (data: RegisterData): Promise<void> => {
  const response = await fetch(`${config.API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error en el registro");
  }
};

export { login, register };
