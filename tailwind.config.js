/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        'btn-color': '#0D6EFD',
        'bg-banner': '#0d6efd0d',
        'bg-modalClose': '#DC3545'
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light']
  }
}

