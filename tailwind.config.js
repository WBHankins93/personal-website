/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            heading: ['var(--font-heading)', 'sans-serif'],
            body: ['var(--font-body)', 'sans-serif'],
            mono: ['var(--font-mono)', 'monospace'],
            sixtyfour: ['var(--font-sixtyfour)'],
          },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
      },
    },
  },
  plugins: [],
}
