import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: 'selector',
    extend: { 
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'], 
      },
      fontWeight: {
        thin: '100',
        'extra-light': '200',
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      colors: {
        primary:'var(--primary-color)',
        bg: {
          light: 'var(--background-light)',
          dark: 'var(--background-dark)',
        },
        text: {
          light: 'var(--text-light)',
          dark: 'var(--text-dark)',
        }
      },
      screens: {
        'sm': '480px', 
        'md': '769px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1439px',
        '3xl': '2050px',
      },
    },
  },
  plugins: [],
} satisfies Config;
