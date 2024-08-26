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
  extend: {
    colors: {
      admin: {
        primary: "#002656",
        onPrimary: "#FFFFFF",
        primaryContainer: "#1C4888",
        onPrimaryContainer: "#D9E4FF",
        primaryFixed: "#D7E2FF",
        primaryFixedDim: "#ABC7FF",
        onPrimaryFixed: "#001B3F",
        onPrimaryFixedVariant: "#194686",
        lightPrimary: "#2F5E90",

        secondary: "#515E7A",
        onSecondary: "#FFFFFF",
        secondaryContainer: "#D6E2FF",
        onSecondaryContainer: "#3A4862",
        secondaryFixed: "#D7E2FF",
        secondaryFixedDim: "#B9C7E6",
        onSecondaryFixed: "#0D1B33",
        onSecondaryFixedVariant: "#3A4761",
        lightSecondary: "#D7E1FF",

        tertiary: "#2E5142",
        onTertiary: "#FFFFFF",
        tertiaryContainer: "#527565",
        onTertiaryContainer: "#FFFFFF",
        tertiaryFixed: "#C4EBD7",
        tertiaryFixedDim: "#A9CFBB",
        onTertiaryFixed: "#002115",
        onTertiaryFixedVariant: "#2B4D3F",
        tertiaryLightContainer: "#537565",

        error: "#BA1A1A",
        errorContainer: "#FFDAD6",
        onErrorContainer: "#410002",

        surface: "#F9F9FF",
        surfaceVariant: "#DFE2EE",
        surfaceDim: "#DAD9DF",
        surfaceBright: "#F9F9FF",
        surfaceTint: "#365E9F",
        surfaceContainerLow: "#F3F3F9",
        surfaceContainer: "#EEEDF3",
        surfaceContainerHigh: "#E8E7EE",
        surfaceContainerHighest: "#E2E2E8",
        onSurface: "#1A1B20",
        onSurfaceVariant: "#434750",
        surfaceTintLight: "#E9EDF7",
        surfaceContainerMedium: "#DEE2EE",
        surfaceShadyContainer: "#F3F3FA",

        outline: "#737781",
        outlineVariant: "#C3C6D2",
        lightOutline: "#727781",

        inverseSurface: "#2F3035",
        inverseOnSurface: "#F1F0F6",
        inversePrimary: "#ABC7FF",

        scrim: "#000000",
        shadow: "#000000",

        background: "#F9F9FF",
        onBackground: "#1A1B20",
      },
    },
  },
  plugins: [tailwindTypography, require("tailwindcss-grid-area")],
} satisfies Config;
