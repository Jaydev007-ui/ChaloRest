import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        asphalt: {
          900: "#0D0E10",
          DEFAULT: "#17191C",
          800: "#1E2125",
          700: "#25292E",
          600: "#32373E",
        },
        charcoal: {
          DEFAULT: "#25292E",
          light: "#343A42",
        },
        highway: {
          orange: "#FF8A24",
          "orange-hover": "#E67718",
          yellow: "#FFC928",
          "yellow-hover": "#E5B31B",
        },
        road: {
          yellow: "#FFC928",
        },
        offwhite: "#F7F7F4",
        success: {
          green: "#24A36A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
