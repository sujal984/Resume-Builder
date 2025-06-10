module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {}, // you can define your own here if needed
    },
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
  // 🔴 Add this to disable modern color syntax like oklch()
  safelist: [],
  corePlugins: {
    preflight: true,
  },
};
