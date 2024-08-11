/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        customPrimary: '#D03737', // Custom color for #D03737
        customPrimaryHover: '#D02525',
        customSecondary: '#0C1248', // Custom color for #0C1248
        customSecondaryHover: '#12338F',
        customGrey: '#B2B2B2',
      },
    },
  },
  plugins: [],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
}
