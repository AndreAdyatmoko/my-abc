/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      jaro: ["Jaro", "sans-serif"],
      freeman: ["Freeman", "sans-serif"],
      libre: ["Libre Franklin", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#003399",
        secondary: "#1e40af",
        third: "#111827",
        fourth: "#F0F2F5",
        fifth: "#42B72A",
        hover: "#1d4ed8",
        "modal-hover": "#172554",
        customBorder: "#D4D7E3", // Tambahkan warna kustom di sini
        customBorder2: "#F7FBFF",
        customBg :"#162D3A",
        customBg2 : "#161616"
      },
    },
  },
  plugins: [],
};
