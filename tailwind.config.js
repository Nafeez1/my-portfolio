/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0B0B0B",
        gold: "#FFD700",
        darkGold: "#D4AF37",
        lightGray: "#E0E0E0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.8s ease-out",
        goldPulse: "goldPulse 2s ease-in-out infinite",
      },
      boxShadow: {
        gold: "0 0 40px rgba(255, 215, 0, 0.3)",
        "gold-lg": "0 0 60px rgba(255, 215, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
