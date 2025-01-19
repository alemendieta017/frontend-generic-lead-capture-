import type { Config } from "tailwindcss";
import * as flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "50": "#f0fafb",
          "100": "#daf2f3",
          "200": "#b9e5e8",
          "300": "#89d1d7",
          "400": "#44abb6",
          "500": "#3698a4",
          "600": "#307c8a",
          "700": "#2c6672",
          "800": "#2b545f",
          "900": "#284751",
          "950": "#162e36",
        },
      },
      fontFamily: {
        sans: ["var(--font-open-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [flowbite.plugin()],
} satisfies Config;
