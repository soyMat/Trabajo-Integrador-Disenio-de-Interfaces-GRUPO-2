/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-teal': '#1A535C',
        'brand-cyan': '#4ECDC4',
        'brand-mint': '#F7FFF7',
        'brand-coral': '#F78E69',
        'brand-indigo': '#2B2B3E',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Space Mono', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        title: ['"ITC Avant Garde Gothic"', 'Futura', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
