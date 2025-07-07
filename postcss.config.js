module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- THIS IS THE FIX
    autoprefixer: {},
  },
};