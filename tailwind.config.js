export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        'primary': 'rgb(65, 2, 167)',
        'secondary': 'rgb(92, 39, 218)',
      }
    },
    fontFamily:{
      'hero-font': 'Exo',
      'title-font': 'Days One',
      'list-font': 'Josefin Sans',
      'row-font': 'Rowdies',
    }
  },
  plugins: [],
}