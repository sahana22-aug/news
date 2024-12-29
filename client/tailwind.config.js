/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,css}",  // Include CSS files
  ],
  theme: {
    extend: {
      colors: {
        lightBg: "#E2E8F0",
        lightBgPrimary: "#F8FAFC",
        lightBgSecondary: "#0F172A",
      },
      screens: {
        'sm': '576px',  // => @media (min-width: 576px) { ... }
        'md': '960px',  // => @media (min-width: 960px) { ... }
        'lg': '1440px', // => @media (min-width: 1440px) { ... }
      },
    },
  },
  plugins: [],
}
