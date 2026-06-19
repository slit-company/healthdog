import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        hd: {
          base: "#fffdf8",
          cream: "#f7f1e6",
          sage: "#e4ecdd",
          sageDeep: "#78936e",
          green: "#5cbf6f",
          yellow: "#f3c84b",
          ink: "#26312b",
          muted: "#5f665d",
          line: "#e8dfd2",
          card: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Gowun Batang", "Seongang", "Pretendard", "serif"],
        health: ["Gowun Batang", "Noto Serif KR", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
