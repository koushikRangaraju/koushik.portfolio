import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0a0a", // Exact parthh.in background
        },
        surface: {
          DEFAULT: "#111111", // Exact parthh.in card surface
          card: "#161616",
        },
        primary: {
          DEFAULT: "#ffffff",
        },
        secondary: {
          DEFAULT: "#888888", // parthh.in muted secondary
        },
        accent: {
          emerald: "#10b981", // parthh.in exact accent
          emeraldLight: "#34d399",
        },
        border: {
          DEFAULT: "#1f1f1f", // parthh.in default border
          subtle: "rgba(255, 255, 255, 0.05)",
          glass: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
      boxShadow: {
        "glow": "0 0 30px rgba(16,185,129,0.12)",
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
