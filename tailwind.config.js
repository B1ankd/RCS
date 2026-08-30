module.exports = {
  content: ['./index.html', './capabilities.html', './contact.html', './404.html'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0b0e',
        panel: '#111318',
        panel2: '#15181e',
        crimson: { DEFAULT: '#c1121f', deep: '#970c1c', dark: '#6d0812' }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
}
