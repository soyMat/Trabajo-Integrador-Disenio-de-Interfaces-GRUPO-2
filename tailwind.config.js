/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-screen': '#7F8BB2',
        'brand-surface': '#E1E4EB',
        'brand-separator': '#F3EFE7',
        'brand-button': '#364674',
        'brand-teal': '#364674',
        'brand-cyan': '#6675A1',
        'brand-mint': '#E1E4EB',
        'brand-coral': '#F78E69',
        'brand-indigo': '#1C1C1E',
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
