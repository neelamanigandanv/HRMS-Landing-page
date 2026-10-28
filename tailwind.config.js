/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004B49',
          hover: '#003836',
          dark: '#00201F',
        },
        accent: {
          DEFAULT: '#C6F36B',
          hover: '#B5E955',
        },
        surface: {
          alt: '#F6F8F8',
        },
        border: '#E5EAEA',
        'text-heading': '#0B1514',
        'text-body': '#4B5857',
        'text-muted': '#7C8886',
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
        input: '10px',
        badge: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
