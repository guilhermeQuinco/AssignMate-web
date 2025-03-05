import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        centurygothic: ["var(--centurygothic)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"], 
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(194.49deg, #D2D0D3 17.78%, #A9A8B3 26.62%, #5B5A76 55.75%, #313056 82.97%)",
      },
    },
  },
  plugins: [],
} satisfies Config;