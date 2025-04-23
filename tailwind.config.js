const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        // Add the fonts here, matching the names from Google Fonts
        // Use defaultTheme.fontFamily.sans as fallback
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        lato: ['Lato', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
        'source-sans-pro': ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        raleway: ['Raleway', ...defaultTheme.fontFamily.sans],
        oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

