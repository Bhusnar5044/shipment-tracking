import tailwindTypography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: [...fontFamily.sans],
    },
  },
  extend: {},
  plugins: [tailwindTypography, require("tailwindcss-grid-area")],
} satisfies Config;
