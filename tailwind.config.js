
module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Jost'],
      'serif': ['Alegreya'],
      'logotitle': ['Alegreya'],
    },

    extend: {
      
      colors: {
        pblue: "#3C4A87",
        pred: "#DB371C",
        pwhite: "#0D0B0A",
        pyellow: "#F2B277",
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
