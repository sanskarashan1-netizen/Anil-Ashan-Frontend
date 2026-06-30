/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        luxury: {
          black:    '#020408',
          navy:     '#060d1a',
          darkBlue: '#0a1628',
          gold:     '#c9a84c',
          goldLight:'#e8c97a',
          goldDark: '#a07830',
          white:    '#f5f0e8',
          light:    '#d4cfc6',
          muted:    '#8a8070',
          accent:   '#a07830',
        }
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold-glow':       '0 0 30px rgba(201,168,76,0.2)',
        'gold-glow-hover': '0 0 50px rgba(201,168,76,0.38)',
        'gold-sm':         '0 0 15px rgba(201,168,76,0.15)',
      },
    },
  },
  plugins: [],
}
