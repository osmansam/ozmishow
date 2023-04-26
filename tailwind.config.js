/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        whiteButtonBackground: "#f6f6f6",
        blackButtonBackground: "#333333",
        freqUnderline: "#e2e2e2",
      },
    },
    plugins: [],
  },
};
