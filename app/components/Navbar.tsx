"use client";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div>
      <nav className="border-gray-200 bg-white px-4 shadow dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <a href="#" className="flex items-center rtl:space-x-reverse">
            <div className="flex h-16 w-9 items-center justify-center overflow-hidden">
              <Image
                src="/fronteer-logo-shape.svg"
                alt="Flowbite Logo"
                width={500}
                height={500}
                className="h-full object-cover"
              />
            </div>
            <h1 className="font-sans font-medium">fronteer</h1>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full font-sans md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-10 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
              {user ? (
                <>
                  <li className="flex items-center">
                    <span className="font-light">
                      Hola&nbsp;
                      <span className="font-medium text-gray-900 dark:text-white">
                        {user.firstName}
                      </span>
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <a
                    href="/login"
                    className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Iniciar sesión
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div
        className={`transform transition-all duration-300 ease-in-out md:hidden ${
          toggleDropdown ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-b border-gray-200 bg-slate-50 shadow-inner dark:border-gray-700`}
      >
        <ul className="flex flex-col divide-y font-sans rtl:space-x-reverse">
          {user ? (
            <>
              <li className="flex items-center justify-center space-x-1 p-4 rtl:space-x-reverse">
                <span className="text-gray-900 dark:text-white">Hola</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {user.firstName}
                </span>
              </li>
              <li className="flex items-center justify-center space-x-3 p-4 rtl:space-x-reverse">
                <button
                  onClick={logout}
                  className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li className="flex items-center justify-center p-4 rtl:space-x-reverse">
              <a
                href="/login"
                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Iniciar sesión
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
