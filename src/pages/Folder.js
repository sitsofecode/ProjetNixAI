import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Folder() {
  return (
    <View style={Styles.container}>
      <Text>Folder</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});