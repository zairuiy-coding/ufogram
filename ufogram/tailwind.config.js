module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          'mountbatten-pink': '#9D858D',
          'rose-quartz': '#BBA0B2',
          'cool-gray': '#A4A8D1',
          'space-cadet': '#392F5A',
          'cadet-gray': '#8CABBE',
        },
      },
    },
    variants: {
      extend: {
        transform: ['hover', 'focus'],
        scale: ['hover', 'focus'],
      },
    },
    plugins: [],
  }
  