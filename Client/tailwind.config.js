/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'halfre': ['halfre', 'sans-serif'],
      },
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
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        light: '#ffffff'
      },

      // Taille de texte réduite de 10%
      fontSize: {
        'xs': '0.675rem',     // ~10.8px
        'sm': '0.7875rem',    // ~12.6px
        'base': '0.84375rem', // ~13.5px
        'lg': '1.0125rem',    // ~16.2px
        'xl': '1.125rem',     // ~18px
        '2xl': '1.35rem',     // ~21.6px
        '3xl': '1.6875rem',   // ~27px
        '4xl': '2.025rem',    // ~32.4px
        '5xl': '2.7rem',      // ~43.2px
      },

      // Espacement réduit de 10% supplémentaire
      spacing: {
        'xs': '0.405rem',      // 0.45rem -10% = ~6.48px
        'sm': '0.6075rem',     // 0.675rem -10% = ~9.72px
        'md': '0.81rem',       // 0.9rem -10% = ~12.96px
        'lg': '1.215rem',      // 1.35rem -10% = ~19.44px
        'xl': '1.62rem',       // 1.8rem -10% = ~25.92px
        '2xl': '2.43rem',      // 2.7rem -10% = ~38.88px
      },

      // Marges réduites de 10% supplémentaire
      margin: {
        'xs': '0.405rem',
        'sm': '0.6075rem',
        'md': '0.81rem',
        'lg': '1.215rem',
        'xl': '1.62rem',
        '2xl': '2.43rem',
      },

      // Padding réduit de 10% supplémentaire
      padding: {
        'xs': '0.405rem',
        'sm': '0.6075rem',
        'md': '0.81rem',
        'lg': '1.215rem',
        'xl': '1.62rem',
        '2xl': '2.43rem',
      },
      

      // Bordures légèrement réduites
      borderWidth: {
        'DEFAULT': '0.9px',   // Réduit de 10%
        '0': '0',
        '2': '1.8px',
        '3': '2.7px',
        '4': '3.6px',
      },

      // Ombres réduites de 10%
      boxShadow: {
        'sm': '0 0.9px 1.8px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 0.9px 2.7px 0 rgba(0, 0, 0, 0.1), 0 0.9px 1.8px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 3.6px 5.4px -0.9px rgba(0, 0, 0, 0.1), 0 1.8px 3.6px -0.9px rgba(0, 0, 0, 0.06)',
        'lg': '0 9px 13.5px -2.7px rgba(0, 0, 0, 0.1), 0 3.6px 5.4px -1.8px rgba(0, 0, 0, 0.05)',
      },

      // Arrondis réduits de 10%
      borderRadius: {
        'sm': '0.1125rem',   // ~1.8px
        'DEFAULT': '0.225rem', // ~3.6px
        'md': '0.3375rem',   // ~5.4px
        'lg': '0.45rem',     // ~7.2px
        'xl': '0.675rem',    // ~10.8px
      }
    },
  },
  plugins: [],
};