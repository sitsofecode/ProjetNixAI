import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { initialTheme } from "../constantes/Theme";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";
import { mainColor } from "../constantes/colorConstante";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ApiServices from "../services/ApiServices";

export default function AudioText() {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);

  useEffect(() => {
    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync()
        .then((permission) => {
          console.log("Permission Granted: " + permission.granted);
          setAudioPermission(permission.granted);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Call function to get permission
    getPermission();
    // Cleanup upon first render
    return () => {
      setIsComponentMounted(false);
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log("Starting Recording");
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }
  async function stopRecording() {
    try {
      if (recordingStatus === "recording") {
        console.log("Stopping Recording");

        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

        console.log("uri : ", recordingUri);

        // Create a file name for the recording
        const fileName = `recording-${Date.now()}.caf`;

        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "recordings/",
          { intermediates: true }
        );
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
        });

        // Call function to send audio to API after recording is stopped
        // Make sure to use the correct file path after moving the file
        const audioFilePath =
          FileSystem.documentDirectory + "recordings/" + `${fileName}`;
        try {
          const formData = new FormData();
          formData.append("audioFile", {
            uri: audioFilePath,
            type: "audio/x-caf",
            name: "recording.caf",
          });

          console.log(formData);
          const audioResponse = await ApiServices._sendAudio(formData);
          console.log(audioResponse);
        } catch (error) {
          console.error("Erreur lors de l'envoi du fichier audio:", error);
        }

        // This is for simply playing the sound back
        const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({
          uri: audioFilePath,
        });
        await playbackObject.playAsync();

        // Reset our states to record again
        setRecording(null);
        setRecordingStatus("stopped");
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  // async function sendAudioToAPI() {
  //   const uri = recording.getURI();
  //   try {
  //     const formData = new FormData();
  //     formData.append("audioFile", {
  //       uri: uri,
  //       type: "audio/x-caf",
  //       name: "recording.caf",
  //     });

  //     console.log(formData);
  //     const audioResponse = await ApiServices._sendAudio(formData);
  //     console.log(audioResponse);
  //   } catch (error) {
  //     console.error("Erreur lors de l'envoi du fichier audio:", error);
  //   }
  // }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log("Saved audio file to", savedUri);
      }
    } else {
      await startRecording();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.Textcontainer}>
        <Text style={styles.text}>Enregistrez un audio</Text>
      </View>
      <View style={styles.Recordingcontainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRecordButtonPress}
        >
          <Ionicons
            name={recording ? "stop-circle" : "mic-circle"}
            size={64}
            color={initialTheme.background}
          />
        </TouchableOpacity>
        <Text
          style={styles.recordingStatusText}
        >{`Recording status: ${recordingStatus}`}</Text>
        {recordingStatus === "recording" && (
          <Image
            style={{ width: wp(100), height: hp(5) }}
            source={{
              uri: "https://64.media.tumblr.com/tumblr_m3a23dcgmq1qg6rkio1_500.gifv",
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: initialTheme.background,
  },
  Textcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Recordingcontainer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    width: wp(100),
    justifyContent: "flex-end",
  },
  text: {
    color: initialTheme.text,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 64,
    backgroundColor: mainColor,
  },
  recordingStatusText: {
    marginTop: 16,
  },
});
