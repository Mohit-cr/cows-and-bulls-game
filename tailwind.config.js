/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'recipe-red': '#FF6B6B',
        'recipe-green': '#4ECDC4',
        'recipe-yellow': '#FFD166',
        'recipe-purple': '#6F5A7E',
        'recipe-orange': '#F38181',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-playfair-display)'],
      },
    },
  },
  plugins: [],
}; 