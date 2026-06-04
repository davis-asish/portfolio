/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        onyx: '#080808',
        surface: {
          DEFAULT: '#111111',
          2: '#161616',
          3: '#1c1c1c',
          4: '#242424',
        },
        cyan: {
          DEFAULT: '#00d4ff',
          dim: '#00aacc',
          glow: 'rgba(0,212,255,0.15)',
        },
        violet: {
          DEFAULT: '#8b5cf6',
          dim: '#6d45c9',
          glow: 'rgba(139,92,246,0.15)',
        },
        clay: {
          DEFAULT: '#c4a882',
          light: '#d4bea0',
          dark: '#9a7d60',
        },
        text: {
          primary: '#f0ede8',
          secondary: '#9a9590',
          muted: '#4a4540',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(0,212,255,0.2)',
        'glow-violet': '0 0 40px rgba(139,92,246,0.2)',
        'glow-clay': '0 0 40px rgba(196,168,130,0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}
