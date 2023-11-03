import { type Config } from "tailwindcss";
import Typography from "@tailwindcss/typography";
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [Typography],
}) satisfies Config;
