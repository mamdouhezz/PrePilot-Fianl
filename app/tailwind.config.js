/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        sans: ['"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      colors: {
        background: '#F7F9FC',
        foreground: '#101B2D',
        primary: '#00B8D9',
        secondary: '#FFB84D',
        'prepilot-purple': {
          '50': '#f5f3ff',
          '100': '#ede9fe',
          '200': '#ddd6fe',
          '300': '#c4b5fd',
          '400': '#a78bfa',
          '500': '#8b5cf6',
          '600': '#7c3aed',
          '700': '#6d28d9',
          '800': '#5b21b6',
          '900': '#4c1d95',
          '950': '#2e1065',
        },
        'brand-navy': {
          '600': '#3A4D6F',
          '700': '#1D3B66',
          '800': '#112240',
          '900': '#0A192F',
          '950': '#050D19',
        },
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
    }
  },
  plugins: [],
}