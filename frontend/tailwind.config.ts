import type { Config } from "tailwindcss";

const config: Config = {
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
        cadetblue: "#b5d7d1",
        ash: "#b4b4b4",
        fern: "#009a62",
        lightteal: "#80bab0",
        customGray: "#9CA3AF",
        caramel: "#9A5C00",
      },
    },
  },
  plugins: [],
};
export default config;
