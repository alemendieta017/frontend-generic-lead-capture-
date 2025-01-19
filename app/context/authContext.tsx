"use client";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getProfile } from "../services/authService";
import { User } from "../interfaces/user.types";

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

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  }, [router]);

  const login = async (token: string) => {
    try {
      setToken(token);
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (!decodedToken.sub) {
        throw new Error("Invalid token");
      }
      
      const userData = await getProfile(decodedToken.sub, token);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      logout();
    }
  };

  const isTokenExpired = (decodedToken: JwtPayload) => {
    if (!decodedToken.exp) {
      return true;
    }
    return Date.now() >= decodedToken.exp * 1000;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const decodedToken = jwtDecode<JwtPayload>(storedToken);
          const tokenExpired = isTokenExpired(decodedToken);

          if (tokenExpired) {
            console.warn("Token expired");
            logout();
            return;
          }

          setToken(storedToken);

          if (!decodedToken.sub) {
            throw new Error("Invalid token");
          }

          const userData = await getProfile(decodedToken.sub, storedToken);
          setUser(userData);
        }
      } catch (error) {
        console.error("Initialization Auth error:", error);
        logout();
      } finally {
        setInitializing(false);
      }
    };

    initializeAuth();
  }, [logout]);

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
