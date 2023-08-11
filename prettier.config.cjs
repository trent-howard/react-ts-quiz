/* eslint-env node */
/** @type {import("prettier").Options} */
const config = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  trailingComma: 'es5',
  singleQuote: true,
};

module.exports = config;
