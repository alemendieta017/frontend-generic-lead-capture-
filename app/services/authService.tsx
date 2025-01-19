"use client";
import config from "../config/config";
import { User } from "../interfaces/user.types";

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

const getProfile = async (userId: string, token: string): Promise<User> => {
  const response = await fetch(`${config.API_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener el perfil");
  }

  const profile: User = await response.json();

  return profile;
};

export { login, register, getProfile };
