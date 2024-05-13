import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { mainColor } from "../constantes/colorConstante";
import { initialTheme } from "../constantes/Theme";

export default function OptionalModal({ visible, onClose, currentItem }) {
  const filename = currentItem?.filename;
  return (
    <>
      <StatusBar hidden={true} />
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.Modal}>
          <Text style={styles.title} numberOfLines={1}>
            {filename}
          </Text>
          <View style={styles.optionContainer}>
            <TouchableWithoutFeedback
            // onPress={onPlay}
            >
              <View style={{ flexDirection: "row " }}>
                <MaterialCommunityIcons name="play" size={25} />
                <Text style={styles.option}> Play </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
            // onPress={onTranscript}
            >
              <Text style={styles.option}>Transcript this video </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
            //  onPress={onInfo}
            >
              <Text style={styles.option}>Information </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalbg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

styles = StyleSheet.create({
  Modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: initialTheme.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
  },
  modalbg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0 , 0 , 0 , 0.2)",
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: mainColor,
  },
  optionContainer: {
    padding: 20,
  },
  option: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 2,
  },
});
