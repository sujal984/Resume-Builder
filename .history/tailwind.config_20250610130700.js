// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        // define your custom colors here if needed
      },
    },
  },
  // 👇 This will disable the use of modern color functions like oklch
  experimental: {
    optimizeUniversalDefaults: true,
  },
};
