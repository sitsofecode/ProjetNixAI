import { Appearance, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./colorConstante";
const colorScheme = Appearance.getColorScheme();

export const initialTheme = colorScheme === "dark" ? darkTheme : lightTheme;
console.log(colorScheme);
