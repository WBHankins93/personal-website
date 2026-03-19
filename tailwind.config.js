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
      colors: {
        matrix: {
          DEFAULT: '#00FF41',
          light: '#39FF6E',
          dim: '#00CC34',
          dark: '#009926',
        },
        mbg: {
          primary: '#060606',
          card: 'rgba(10,10,10,0.75)',
          cardHover: 'rgba(16,16,16,0.85)',
        },
        mborder: {
          subtle: 'rgba(255,255,255,0.04)',
          hover: 'rgba(255,255,255,0.10)',
          rule: 'rgba(255,255,255,0.06)',
        },
        mglow: {
          sm: 'rgba(0,255,65,0.08)',
          md: 'rgba(0,255,65,0.15)',
          lg: 'rgba(0,255,65,0.25)',
          border: 'rgba(0,255,65,0.10)',
          borderHover: 'rgba(0,255,65,0.30)',
        },
        mtext: {
          primary: '#EDEDED',
          dim: '#999999',
          light: '#B0B0B0',
          muted: '#5A5A5A',
        },
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
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'cursor-blink': {
          '0%, 100%': { borderColor: '#00FF41' },
          '50%': { borderColor: 'transparent' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
        'ticker-scroll': 'ticker-scroll 35s linear infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
