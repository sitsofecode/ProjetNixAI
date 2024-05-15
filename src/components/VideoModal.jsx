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

export default function VideoModal({ visible, onClose, currentItem }) {
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
              <View>
                <Text style={styles.option}>
                  <MaterialCommunityIcons
                    name="play"
                    size={20}
                    color={initialTheme.text}
                  />
                  Play
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
            // onPress={onTranscript}
            >
              <Text style={styles.option}>
                {" "}
                <MaterialCommunityIcons
                  name="play"
                  size={20}
                  color={initialTheme.text}
                />
                Transcript this video
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
            //  onPress={onInfo}
            >
              <Text style={styles.option}>
                {" "}
                <MaterialCommunityIcons
                  name="play"
                  size={20}
                  color={initialTheme.text}
                />
                Information{" "}
              </Text>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
    backgroundColor: initialTheme.background,
  },
  modalbg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: initialTheme.modalbg,
    opacity: 0.5,
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
    color: initialTheme.text,
    letterSpacing: 2,
  },
});
