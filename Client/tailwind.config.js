/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        bell: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(25deg)' },
          '20%': { transform: 'rotate(-25deg)' },
          '30%': { transform: 'rotate(18deg)' },
          '40%': { transform: 'rotate(-18deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(-10deg)' },
        },
      },
      animation: {
        bell: 'bell 1s ease-in-out',
        'bell-infinite': 'bell 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
