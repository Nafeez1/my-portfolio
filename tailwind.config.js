/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAFAF7",
        white: "#FFFFFF",
        navy: "#1F2A44",
        warmGray: "#8A8F98",
        ink: "#1C1C1C",
        body: "#3A3A3A",
        muted: "#6B7280",
        border: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      letterSpacing: {
        tight: "-0.01em",
        name: "0.02em",
      },
      borderRadius: {
        card: "10px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.06)",
        button: "0 4px 12px rgba(31, 42, 68, 0.15)",
      },
    },
  },
  plugins: [],
};
