import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { initialTheme } from "./src/constantes/Theme";
import VideoProvider from "./src/context/videoContext";
import AppNavigation from "./src/navigation/AppNavigation";
import "react-native-gesture-handler";

export default function App() {
  return (
    <VideoProvider>
      <AppNavigation />
    </VideoProvider>
  );
}
