/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "context/**/*.{js,jsx,ts,tsx}",
    "providers/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", // Bright blue for light theme
          dark: "#4f46e5", // Brighter indigo for dark theme (improved from #1e1b4b)
        },
        secondary: {
          DEFAULT: "#4f46e5", // Indigo for light theme
          dark: "#6366f1", // Brighter indigo for dark theme (improved)
        },
        bg: {
          DEFAULT: "#ffffff", // Pure white for light theme
          dark: "#0f172a", // Rich dark blue for dark theme
        },
        text: {
          DEFAULT: "#1e293b", // Dark blue-gray for light theme
          dark: "#f1f5f9", // Lighter gray for dark theme (improved contrast)
        },
        border: {
          DEFAULT: "#e2e8f0", // Light gray border
          dark: "#334155", // Lighter border for dark theme (improved visibility)
        },
        danger: {
          DEFAULT: "#ef4444", // Red
          dark: "#f87171", // Lighter red for dark theme
        },
        success: {
          DEFAULT: "#22c55e", // Green
          dark: "#4ade80", // Lighter green for dark theme
        },
        warning: {
          DEFAULT: "#f59e0b", // Yellow
          dark: "#fbbf24", // Lighter yellow for dark theme
        },
      },
    },
  },
  plugins: [],
};
