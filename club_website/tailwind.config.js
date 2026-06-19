/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A2472',
          deep: '#0B1F5E',
        },
        gold: {
          DEFAULT: '#F7A600',
          light: '#FFB81C',
          cta: '#F5A623',
        },
        ink: '#1A1A2E',
        muted: '#6B7280',
        canvas: '#F8F9FB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      maxWidth: {
        content: '1400px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(10, 36, 114, 0.08)',
        cardHover: '0 10px 30px rgba(10, 36, 114, 0.15)',
      },
    },
  },
  plugins: [],
}
