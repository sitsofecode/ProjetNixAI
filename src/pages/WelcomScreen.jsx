import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { initialTheme } from "../constantes/Theme";
import { mainColor } from "../constantes/colorConstante";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function WelcomScreen({ navigation }) {
  const gradientHeight = 2000;
  const gradientBackground = initialTheme.background;
  const data = Array.from({ length: gradientHeight }, (x = 1) => (x = x + 1));

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/free.webp")}
        style={{ width: "100%", height: "80%" }}
      ></ImageBackground>
      {data.map((_, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            backgroundColor: gradientBackground,
            height: 1,
            bottom: gradientHeight - i,
            right: 0,
            left: 0,
            zIndex: 0,
            opacity: (1 / gradientHeight) * (i + 300),
          }}
        />
      ))}
      <View style={{ alignItems: "center" }}>
        <Text style={styles.imageText}> NIX </Text>
      </View>
      <View style={styles.container}>
        <View
          style={{
            position: "relative",
            top: -hp(25),
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={styles.title}>Bienvenue </Text>
          <Text style={styles.text}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum id
            tempore ullam placeat perspiciatis obcaecati, dolorum, neque, at
            porro vel odit repellendus cupiditate modi! Eum repellat repudiandae
            quo tempore illum!
          </Text>
        </View>
        <View
          style={{
            position: "relative",
            top: -hp(20),
            alignItems: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={styles.SignIn}
            onPress={() => navigation.navigate("HomeTabs")}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Commencer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    height: hp(100),
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    color: mainColor,
    marginBottom: wp(2),
    fontSize: hp(3),
    fontWeight: "600",
  },
  text: {
    color: initialTheme.text,
    fontWeight: "300",
    paddingHorizontal: wp(2),
    textAlign: "center",
  },
  imageText: {
    color: mainColor,
    fontSize: hp(5),
    position: "relative",
    top: -hp(50),
    fontWeight: "bold",
    letterSpacing: 5,
  },
  SignIn: {
    marginTop: wp(0),
    paddingTop: hp(1.5),
    paddingBottom: hp(1.5),
    backgroundColor: mainColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: initialTheme.background,
    width: wp(90),
  },
  SignUp: {
    marginTop: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: hp(1.5),
    backgroundColor: initialTheme.background,
    borderRadius: 10,
    width: wp(90),
    borderWidth: 1,
    borderColor: mainColor,
  },
});
