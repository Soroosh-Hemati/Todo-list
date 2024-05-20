/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        primary:['Poppins']
      },
      colors:{
        primary: '#002765',
        secondary: '#ff5945'
      }
    },
  },
  plugins: [],
}

