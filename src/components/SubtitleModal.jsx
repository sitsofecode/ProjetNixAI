import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { mainColor } from "../constantes/colorConstante";
import { initialTheme } from "../constantes/Theme";

export default function SubtitleModal({
  visible,
  onClose,
  currentItem,
  handleSelected,
}) {
  const filename = currentItem?.filename;
  return (
    <>
      <StatusBar hidden={true} />
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.Modal}>
          <Text style={styles.title} numberOfLines={1}>
            {filename}
          </Text>
          <View style={{ padding: wp(2) }}>
            <Text>Vous voulez traduire en quel langue</Text>
          </View>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              onPress={() => {
                handleSelected("Yoruba");
              }}
              style={{ padding: 10 }}
            >
              <View>
                <Text style={styles.option}>
                  <FontAwesome
                    name="language"
                    size={20}
                    color={initialTheme.text}
                  />{" "}
                  Yoruba
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSelected("Fon");
              }}
            >
              <Text style={styles.option}>
                <FontAwesome
                  name="language"
                  size={20}
                  color={initialTheme.text}
                />{" "}
                Fon
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSelected("Minan");
              }}
            >
              <Text style={styles.option}>
                <FontAwesome
                  name="language"
                  size={20}
                  color={initialTheme.text}
                />{" "}
                Minan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSelected("Adja");
              }}
            >
              <Text style={styles.option}>
                <FontAwesome
                  name="language"
                  size={20}
                  color={initialTheme.text}
                />{" "}
                Adja
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSelected("Dindji");
              }}
            >
              <Text style={styles.option}>
                <FontAwesome
                  name="language"
                  size={20}
                  color={initialTheme.text}
                />{" "}
                Dindji
              </Text>
            </TouchableOpacity>
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
    width: wp(58),
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
  Subtitle: {},
  text: {
    color: initialTheme.text,
  },
});
