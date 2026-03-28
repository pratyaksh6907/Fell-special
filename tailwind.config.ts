import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        letter: ["var(--font-special-elite)", "ui-monospace", "monospace"],
      },
      colors: {
        blush: {
          light: "#FFF0F5",
          DEFAULT: "#FFD1DC",
          deep: "#FFB6C1",
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(255, 182, 193, 0.35)",
        glow: "0 0 24px rgba(255, 182, 193, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
