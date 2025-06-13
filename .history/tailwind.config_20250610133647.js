module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
    },
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },

  safelist: [],
  corePlugins: {
    preflight: true,
  },
};
