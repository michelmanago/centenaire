
module.exports = {
  purge: {
    content: ['./pages/**/*.js', './components/**/*.js'],
    safelist: [
      'float-none',
      'float-left', 
      'float-right', 
      'sm:float-left',
      'sm:float-right',
      'sm:ml-2', 
      'sm:mr-2', 
      'sm:mt-2',
      'sm:w-1/3',
      'mt-8',
      'mt-2',
      'pt-6', 
      'mb-4', 
      'pl-4', 
      'pr-4', 
      'md:w-96', 
      'h-52', 
      'text-center',
      'mb-2',
      'relative', 
      'h-full', 
      'w-full',
      'mt-4', 
      'w-3/5', 
      'object-bottom', 
      'underline', 
      'text-pblue',
      'bg-blue-600',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Jost'],
      'serif': ['Alegreya'],
      'logotitle': ['Alegreya'],
    },

    extend: {
      
      colors: {
        pblue: {
          DEFAULT: "#3C4A87",
          dark: "#2e3969"
        },
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
