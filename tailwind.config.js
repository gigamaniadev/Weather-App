/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#1C1C1E',
          card: '#2C2C2E',
          hover: '#3A3A3C',
          border: '#3A3A3C',
          text: {
            primary: '#FFFFFF',
            secondary: '#A1A1A6',
            tertiary: '#6C6C70'
          }
        }
      }
    },
  },
  plugins: [],
}