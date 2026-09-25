module.exports = {
  plugins: {
    // Inlines the @imports in globals.css in the order they're written, so the cascade is exact
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
