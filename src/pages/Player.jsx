import React, { useRef, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";

export default function Player({ route, navigation }) {
  const video = route.params;
  const videoRef = useRef(null);
  const [status, setStatus] = useState();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
    console.log("url = ", video.uri);
  }, [videoRef]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Go back </Text>
      </TouchableOpacity>
      <Video
        ref={videoRef}
        source={{ uri: video?.uri }}
        style={styles.video}
        useNativeControls
        nativeControls={true}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      <Button
        title={status?.isPlaying ? "Pause" : "Play"}
        onPress={() => {
          console.log("le statut : ", status);
          status?.isPlaying
            ? videoRef.current.pauseAsync()
            : videoRef.current.playAsync();
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  video: {
    alignSelf: "stretch",
    flex: 1,
  },
});
