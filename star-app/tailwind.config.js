/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        nav: "#ffffff",
        page: "#C7C6DE",
        todo: "#bed5f0",
        "todo-hover": "#9b83de",
        "default-text": "#000000",
        "button-color": "#0084d4",
        "button-hover": "#009fff",
        "purp-accent": "9a6ca8",
        "purp-accent-hover": "#d4abe0"
      },
    },
  },
  plugins: [],
};
