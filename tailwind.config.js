/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        background: '#F7F9FC',
        foreground: '#101B2D',
        primary: '#00B8D9',
        secondary: '#FFB84D',
        'accent-gradient': 'linear-gradient(135deg, #00B8D9 0%, #101B2D 100%)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #00B8D9 0%, #101B2D 100%)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00B8D9, 0 0 10px #00B8D9, 0 0 15px #00B8D9' },
          '100%': { boxShadow: '0 0 10px #00B8D9, 0 0 20px #00B8D9, 0 0 30px #00B8D9' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
