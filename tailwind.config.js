/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.{ts,tsx}',
    '!./node_modules/**',
    '!./dist/**',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a1b26',
          card: '#24283b',
          text: '#a9b1d6',
          primary: '#7aa2f7',
          secondary: '#c0caf5',
          accent: '#bb9af7',
        },
        light: {
          bg: '#f4f5f7',
          card: '#ffffff',
          text: '#3d4554',
          primary: '#2d78f7',
          secondary: '#565c6c',
          accent: '#7e42d6',
        },
      },
    },
  },
  plugins: [],
}
