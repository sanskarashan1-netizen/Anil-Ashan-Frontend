/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        luxury: {
          black:    '#020408',
          navy:     '#080808', // Monochrome Deep Black
          darkBlue: '#101010', // Monochrome Dark Gray
          gold:     '#FFFFFF', // Monochrome Absolute White Accent
          goldLight:'#F3F4F6', // Platinum White
          goldDark: '#E5E7EB', // Silver Gray
          white:    '#FFFFFF', // Pure White
          light:    '#D1D5DB', // Light Silver
          muted:    '#9CA3AF', // Muted Gray
          accent:   '#FFFFFF', // Monochrome White
        }
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold-glow':       '0 0 30px rgba(255,255,255,0.06)',
        'gold-glow-hover': '0 0 50px rgba(255,255,255,0.12)',
        'gold-sm':         '0 0 15px rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}
