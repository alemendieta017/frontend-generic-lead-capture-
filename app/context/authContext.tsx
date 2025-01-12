"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface User {
  _id: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  initializing: true,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        return;
      }
      setToken(storedToken);
      localStorage.setItem("token", storedToken);
      const decodedToken = jwtDecode<User>(storedToken);
      setUser(decodedToken);
    }
    setInitializing(false);
  }, []);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode<User>(token);
    setUser(decodedToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    return Date.now() >= decodedToken.exp * 1000;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
