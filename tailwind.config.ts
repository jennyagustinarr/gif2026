import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#050f0a",
          900: "#0a1f13",
          800: "#0f2b1b",
          700: "#163823",
        },
        mint: {
          100: "#eafaf1",
          200: "#c9f7de",
          300: "#a7f3d0",
          400: "#6ee7a8",
          500: "#3ddc84",
        },
        brand: {
          DEFAULT: "#1f9d55",
          dark: "#167a42",
        },
        lime: {
          300: "#d9f99d",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(26px)" },
          to: { opacity: "1", transform: "none" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-10px) scale(0.98)" },
          to: { opacity: "1", transform: "none" },
        },
        "page-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "none" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(36px, -46px) scale(1.12)" },
          "66%": { transform: "translate(-28px, 26px) scale(0.94)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% center" },
          to: { backgroundPosition: "-200% center" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.65" },
          "70%, 100%": { transform: "scale(2.1)", opacity: "0" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-down": "slide-down 0.22s cubic-bezier(0.22, 1, 0.36, 1) both",
        "page-in": "page-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 7s ease-in-out infinite",
        blob: "blob 20s ease-in-out infinite",
        shimmer: "shimmer 7s linear infinite",
        marquee: "marquee 32s linear infinite",
        "pulse-ring": "pulse-ring 2.8s cubic-bezier(0.24, 0.4, 0.36, 1) infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
