/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D4F1E',
          light: '#3A6527',
          dark: '#1F3614',
        },
        secondary: {
          DEFAULT: '#FAF6F1',
          light: '#FFFFFF',
          dark: '#E5E1DC',
        },
      },
    },
  },
  plugins: [],
}