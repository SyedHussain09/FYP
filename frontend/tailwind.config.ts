import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans]
      },
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d4e9ff",
          200: "#a8d1ff",
          300: "#79b7ff",
          400: "#4b9cff",
          500: "#1d81ff",
          600: "#0062e6",
          700: "#004dbc",
          800: "#003b8f",
          900: "#01275f"
        }
      },
      boxShadow: {
        ambient: "0 20px 45px -25px rgba(17,24,39,0.25)"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
