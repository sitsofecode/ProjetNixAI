// VideoControls.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { mainColor } from "../constantes/colorConstante";
import { initialTheme } from "../constantes/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const VideoControls = ({
  onTogglePlayPause,
  onToggleMute,
  onTogglePlaybackSpeed,
  onSeek,
  onToggleFullscreen,
  duration,
  currentTime: time,
  rate,
  isMuted,
  shouldPlay,
  fullScreenValue,
}) => {
  const formatTime = (timeInMillis) => {
    if (!isNaN(timeInMillis)) {
      const totalSeconds = Math.floor(timeInMillis / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }

    return "00:00";
  };

  return (
    <>
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
        <Slider
          containerStyle={styles.slider}
          minimumValue={0}
          maximumValue={duration * 1000}
          value={time}
          onValueChange={(value) => {
            onSeek(value);
          }}
          onSlidingComplete={(value) => {
            onSeek(value);
          }}
          minimumTrackTintColor="#FFF"
          maximumTrackTintColor="#AAA"
          thumbTintColor="#FFF"
        />
        <Text style={styles.timeText}>{formatTime(duration * 1000)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            onTogglePlayPause();
          }}
          style={[
            styles.controlButton,
            {
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 64,
              padding: 10,
            },
          ]}
        >
          <Ionicons
            name={shouldPlay ? "pause-circle-outline" : "play-circle-outline"}
            size={50}
            color={initialTheme.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onToggleMute();
          }}
          style={{
            position: "absolute",
            bottom: hp(3),
            left: wp(25),
          }}
        >
          <Ionicons
            name={isMuted ? "volume-mute" : "volume-high"}
            size={24}
            color={initialTheme.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTogglePlaybackSpeed();
          }}
          style={{
            position: "absolute",
            bottom: hp(3),
            right: wp(25),
          }}
        >
          <Text style={styles.playbackSpeedText}>{`${rate}x`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onToggleFullscreen();
          }}
          style={{
            position: "absolute",
            bottom: hp(3),
            right: wp(5),
          }}
        >
          <MaterialIcons
            name={fullScreenValue ? "fullscreen-exit" : "fullscreen"}
            size={24}
            color={initialTheme.text}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#000",
  },
  controlButton: {
    marginHorizontal: 10,
  },
  playbackSpeedText: {
    color: initialTheme.text,
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "black",
    padding: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeText: {
    color: initialTheme.text,
    fontSize: 12,
  },
});

export default VideoControls;
