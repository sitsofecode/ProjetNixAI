import React, { useEffect, useRef, useCallback, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { mainColor } from "../constantes/colorConstante";

export const AnimatedTextScreen = ({ text }) => {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  const onTextLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      console.log("finish");
      // Charger d'autres ressources ou effectuer des initialisations nécessaires
      setTimeout(() => {
        setAppReady(true);
        setAnimationComplete(true);
      }, 5000);
    } catch (e) {
      // Gérer les erreurs
    } finally {
      //   setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <AnimatedText text={text} onLoadEnd={onTextLoaded()} />
      </View>
    </View>
  );
};
const AnimatedText = ({ text }) => {
  const animatedValues = useRef(
    text.split("").map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((value, index) => {
      return Animated.timing(value, {
        toValue: 1,
        duration: 100,
        delay: index * 100, // Décaler chaque lettre pour qu'elles apparaissent une par une
        useNativeDriver: true,
      });
    });

    Animated.stagger(25, animations).start(); // Démarrer les animations en séquence
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {text.split("").map((char, index) => (
          <Animated.Text
            key={index}
            style={[styles.text, { opacity: animatedValues[index] }]}
          >
            {char}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal: 15,
  },
  text: {
    fontSize: 24,
    //  fontFamily : "" ,
    color: mainColor,
    fontWeight: "700",
  },
});
