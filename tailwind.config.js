const plugin = require('tailwindcss/plugin');

const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    '.-rotate-x-90': {
      transform: 'rotateX(-90deg)',
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--bg)',
        secondary: 'var(--secondary-bg)',
        tertiary: 'var(--tertiary-bg)',
        nav: 'rgb(var(--nav-bg))',
        code: 'rgb(var(--nav-bg))',
        accent: 'var(--accent)',
      },
      textColor: {
        primary: 'var(--foreground)',
        secondary: 'var(--secondary-foreground)',
        'comms-open': 'var(--comms-open)',
        'comms-closed': 'var(--comms-closed)',
        accent: 'var(--accent)',
        heart: 'var(--heart-color)',
      },
      colors: {
        primary: 'var(--foreground)',
        secondary: 'var(--secondary-foreground)',
        'bg-primary': 'var(--primary-bg)',
        'bg-secondary': 'var(--secondary-bg)',
      },

      accentColor: {
        primary: 'var(--accent)',
        link: 'var(--link-accent)',
      },
      backgroundImage: {
        'gradient-linear': 'var(--bg-gradient)',
      },
      keyframes: {
        heart_position: {
          '0%, 100%': { scale: 1 },
          '20%, 65%': { scale: 0 },
        },
        heart_body_color: {
          '65%': { color: 'transparent' },
          '100%': { color: 'currentColor' },
        },
        heart_stroke_color: {
          '65%': { color: '#999' },
          '100%': { color: 'currentColor' },
        },
        circle: {
          '0%': {
            height: 0,
          },
          '70%': {
            height: '105%',
            'border-width': '35px',
            'border-color': '#f14294',
            opacity: '1',
          },
          '85%': {
            'border-color': '#e242f1',
          },
          '100%': {
            height: '140%',
            'border-width': 0,
          },
        },
        image_focus_overlay: {
          '0%': {
            opacity: 0,
            'pointer-events': 'none',
          },
          '100%': {
            opacity: 1,
            'pointer-events': 'all',
          },
        },
      },
      animation: {
        heart_position:
          'heart_position 800ms cubic-bezier(0.66, 0.03, 0.27, 1.34) forwards',
        heart_body_color:
          'heart_body_color 800ms cubic-bezier(0.66, 0.03, 0.27, 1.34) forwards',
        heart_stroke_color:
          'heart_stroke_color 800ms cubic-bezier(0.66, 0.03, 0.27, 1.34) forwards',
        circle: 'circle 550ms cubic-bezier(0.66, 0.03, 0.27, 1.34) forwards',
        image_focus_overlay: 'image_focus_overlay 250ms ease-out forwards',
      },
      screens: {
        xs: '425px',
      },
    },
  },
  plugins: [rotateX],
};
