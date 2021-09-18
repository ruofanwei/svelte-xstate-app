module.exports = {
  mode: "jit", // Just-in-Time Mode
  purge: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FBF6EB",
        secondary: "#6498C0",
        grey: "#F1EDE2",
        brown: "#483B3B",
        yellow: "#EDC829",
        pulae: "#D3E2F2",
      },
    },
    fontFamily: {
      sans: ["Averia Libre"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
