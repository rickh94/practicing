import { type Config } from "tailwindcss";
import Typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {},
    },
  },
  plugins: [Typography],
} satisfies Config;
