/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_orange: "#D57456",
        primary_black: "#0F172A",
        primary_grey: "#D9D9D9",
        primary_grey_background: "#F2F2F2", 
      },
      fontFamily: {
        Crimson: ["Crimson", "sans-serif"],
        NT: ["NT", "sans-serif"],
      },
    },
  },
  plugins: [],
};
