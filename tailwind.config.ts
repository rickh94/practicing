import { type Config } from "tailwindcss";
import Typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-work-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [Typography],
} satisfies Config;
