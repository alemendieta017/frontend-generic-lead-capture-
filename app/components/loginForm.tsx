"use client";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import * as authService from "../services/authService";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { token } = await authService.login({ email, password });
      if (token) {
        login(token);
        router.push("/");
      } else {
        setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-cyan-600 focus:ring-cyan-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="correo@email.com"
          required={true}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-cyan-600 focus:ring-cyan-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required={true}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-cyan-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-cyan-600"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Recuérdame
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-primary-500 dark:text-primary-500 text-xs font-medium hover:underline md:text-sm"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      <button
        type="submit"
        className="bg-primary-500 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        ¿Todavía no tienes una cuenta?{" "}
        <a
          href="#"
          className="text-primary-500 dark:text-primary-500 font-medium hover:underline"
        >
          Regístrate
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
