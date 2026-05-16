/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['attribute', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          primary:   '#2e8b57',
          secondary: '#f4a261',
          third:     '#264653',
          fourth:    '#e9c46a',
          accent:    '#e76f51',
        },
        // CSS-variable tokens — resolve at runtime for dark/light switching
        main:           'var(--bg-main)',
        card:           'var(--bg-card)',
        primary:        'var(--text-primary)',
        secondary:      'var(--text-secondary)',
        muted:          'var(--text-muted)',
        'border-token': 'var(--border-muted)',
        'focus-token':  'var(--border-focus)',
      },
      screens: {
        'max-sm': { max: '767px' },
      },
    },
  },
  plugins: [],
}
