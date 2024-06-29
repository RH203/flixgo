/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: '300px'
      },
      backgroundColor: {
        primary: "#f0f0f0",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },

    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
