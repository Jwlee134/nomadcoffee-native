import { DefaultTheme } from "@react-navigation/native";

export const navigatorTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "transparent" },
};
