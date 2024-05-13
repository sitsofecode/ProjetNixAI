import { Dimensions } from "react-native";
// Obtenir les dimensions complètes de la fenêtre
const windowDimensions = Dimensions.get("window");
export const screenWidth = windowDimensions.width;
export const screenHeight = windowDimensions.height;

// Si vous préférez, vous pouvez également obtenir les dimensions de l'écran qui excluent les éléments tels que la barre de navigation Android et le notch sur les iPhones
const screenDimensions = Dimensions.get("screen");
export const fullScreenWidth = screenDimensions.width;
export const fullScreenHeight = screenDimensions.height;
