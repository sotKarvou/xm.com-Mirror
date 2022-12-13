/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        mobile: "320px",
        tablet: "768px",
        desktop: "1200px",
      },
      fontFamily:{
        flaja: "'Fjalla One', sans-serif",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
