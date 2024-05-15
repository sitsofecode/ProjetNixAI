import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { initialTheme } from "./src/constantes/Theme";
import VideoProvider from "./src/context/videoContext";
import AppNavigation from "./src/navigation/AppNavigation";
import "react-native-gesture-handler";

export default function App() {
  return (
    <VideoProvider>
      {/* <NavigationContainer> */}
      <AppNavigation />
      {/* </NavigationContainer> */}
    </VideoProvider>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: initialTheme.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
