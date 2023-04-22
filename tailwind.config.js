/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#a4a4a4",
        "gray-30": "#606060",
        "gray-40": "#484848",
        "gray-50": "#4a4a49",
        "white-10": "#f9f7f7",
        "yellow-20": "#b79435",
        "scroll-yellow": "#b89535",
        "scroll-gray": "#e0dbd5",
        "scroll-back": "#f9f7f7",
        "collections-background": "#f0ebe5",
        "nav-gray": "#818b9e",
      },
    },
    plugins: [],
  },
};
