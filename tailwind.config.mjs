/** @type {import('tailwindcss').Config} */

const lightTheme = require('./src/styles/light-theme')
const darkTheme = require('./src/styles/dark-theme')
const defaultTheme = require('tailwindcss/defaultTheme')
const themeSwapper = require('tailwindcss-theme-swapper')
const twColors = require('tailwindcss/colors')

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
      },
      fontFamily: {
        display: ['Minecrafter', ...defaultTheme.fontFamily.sans],
        header: ['Inter', ...defaultTheme.fontFamily.sans],
        body: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        layout: '64rem',
        content: '64rem',
        optical: '75ch',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    themeSwapper({
      themes: [
        // The only required theme is `base`. Every property used in
        // other themes must exist in here.
        {
          name: 'base',
          selectors: [':root', '.light'],
          theme: lightTheme,
        },
        {
          name: 'dark',
          selectors: ['.dark'],

          theme: darkTheme,
        },
      ],
    }),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}
