module.exports = {
  content: ['./index.html', './capabilities.html', './contact.html', './404.html', './church/index.html'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0b0e',
        panel: '#111318',
        panel2: '#15181e',
        crimson: { DEFAULT: '#c1121f', deep: '#970c1c', dark: '#6d0812' }
      },
      fontFamily: {
        display: ['Arial', '"Helvetica Neue"', 'Helvetica', 'sans-serif'],
        sans: ['Arial', '"Helvetica Neue"', 'Helvetica', 'sans-serif'],
        mono: ['Arial', '"Helvetica Neue"', 'Helvetica', 'sans-serif']
      }
    }
  },
  plugins: []
}
