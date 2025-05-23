/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Override default `font-sans` to use Poppins first
        sans: ["Poppins", "Helvetica", "Arial", "sans-serif"],
        // Define a new “serif” family that is Playfair Display
        serif: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
}

