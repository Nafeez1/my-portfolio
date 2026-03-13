/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Luxury Black & Gold Palette
        black: {
          pure: "#000000",
          dark: "#0B0B0B",
          surface: "#1A1A1A",
          card: "#0F0F0F",
        },
        gold: {
          primary: "#FFD700",
          highlight: "#D4AF37",
          dark: "#B8960F",
          light: "#FFF8DC",
          glow: "rgba(255, 215, 0, 0.3)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0B0",
          tertiary: "#808080",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        tech: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        shimmerText: "shimmerText 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        goldGlow: "goldGlow 3s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.8s ease-out",
        fadeInDown: "fadeInDown 0.8s ease-out",
        slideInLeft: "slideInLeft 0.8s ease-out",
        slideInRight: "slideInRight 0.8s ease-out",
        goldPulse: "goldPulse 2s ease-in-out infinite",
        scaleIn: "scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        magneticHover: "magneticHover 0.4s ease-out",
        ripple: "ripple 0.6s ease-out",
        rotateGlow: "rotateGlow 8s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        shimmerText: {
          "0%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
          "100%": { backgroundPosition: "0% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        goldGlow: {
          "0%": { boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        goldPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 215, 0, 0.7)" },
          "50%": { boxShadow: "0 0 0 10px rgba(255, 215, 0, 0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        magneticHover: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        rotateGlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        gold: "0 0 40px rgba(255, 215, 0, 0.3)",
        "gold-lg": "0 0 60px rgba(255, 215, 0, 0.5)",
        "gold-xl": "0 0 80px rgba(255, 215, 0, 0.6)",
        "gold-inner": "inset 0 0 20px rgba(255, 215, 0, 0.2)",
        "elevation-sm": "0 4px 12px rgba(0, 0, 0, 0.4)",
        "elevation-md": "0 8px 24px rgba(0, 0, 0, 0.5)",
        "elevation-lg": "0 16px 40px rgba(0, 0, 0, 0.6)",
        "glow-sm": "0 0 10px rgba(255, 215, 0, 0.2)",
        "glow-md": "0 0 20px rgba(255, 215, 0, 0.4)",
        "glow-lg": "0 0 40px rgba(255, 215, 0, 0.6)",
      },
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        md: "12px",
      },
      borderRadius: {
        card: "16px",
        lg: "12px",
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #FFD700 100%)",
        "gradient-gold-dark": "linear-gradient(135deg, #D4AF37 0%, #B8960F 50%, #D4AF37 100%)",
        "gradient-subtle": "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(212, 175, 55, 0.05) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
