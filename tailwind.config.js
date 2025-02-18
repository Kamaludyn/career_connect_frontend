/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#4F46E5",
        accent: "#F9A8D4",
        lightBg: "#F9FAFB",
        darkBg: "#1f2937",
        lightText: "#111827",
        darkText: "#E5E7EB",
        textSecondary: "#575a60",
        lightBorder: "#D1D5DB",
        darkBorder: "#374151",
        lightElements: "#F9FAFB",
        darkElements: "#252945",
        lightShadow: "#E5E7EB",
        darkShadow: "#1A202C",
        lightCard: "#FFFFFF",
        darkCard: "#252945",
        lightHover: "#F3F4F6",
        darkHover: "#303C55",
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
      },
      boxShadow: {
        uShape: "0 3px 7px 0 rgba(0,0,0,0.5)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
