import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { mainColor } from "../constantes/colorConstante";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoControls from "../components/VideoController";
import { initialTheme } from "../constantes/Theme";
import SubtitleModal from "../components/SubtitleModal";
import ApiServices from "../services/ApiServices";

const playbackSpeedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

const Player = ({ route, navigation }) => {
  const [orientation, setOrientation] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const video = route.params;
  const videoRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handlePlaybackStatusUpdate = useCallback((status) => {
    setCurrentTime(status.positionMillis);
    if (status.didJustFinish) {
      // Handle video finish if needed
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const togglePlaybackSpeed = useCallback(() => {
    const nextSpeedIndex = playbackSpeedOptions.indexOf(playbackSpeed) + 1;
    const nextSpeed =
      nextSpeedIndex < playbackSpeedOptions.length
        ? playbackSpeedOptions[nextSpeedIndex]
        : playbackSpeedOptions[0];
    videoRef.current.setRateAsync(nextSpeed, true);
    setPlaybackSpeed(nextSpeed);
  }, [playbackSpeed]);

  const toggleMute = useCallback(() => {
    videoRef.current.setIsMutedAsync(!isMuted);
    setIsMuted((prevMute) => !prevMute);
  }, [isMuted]);

  const toggleFullscreen = useCallback(async () => {
    if (!isFullscreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    setIsFullscreen((prevFullscreen) => !prevFullscreen);
    setOrientation(await ScreenOrientation.getOrientationAsync());
  }, [isFullscreen]);

  const StarVideo = useCallback(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (videoRef.current) {
        videoRef.current.playAsync();
      }
    });
    return unsubscribe;
  }, [navigation]);

  const sendVideoToApi = async (videoUri, value) => {
    try {
      const formData = new FormData();
      formData.append("File", {
        name: "SampleVideo.mp4",
        uri: videoUri,
        type: "video/mp4",
      });
      formData.append("value", value);

      const response = await ApiServices._sendVideo(formData);

      console.log("Réponse de l'API :", response.data);
      // Gérer la réponse de l'API ici
    } catch (error) {
      console.error("Erreur lors de l'envoi de la vidéo à l'API :", error);
      // Gérer les erreurs ici
    }
  };

  const handleSelected = (value) => {
    console.log(value);
    sendVideoToApi(video.uri, value);
  };

  useEffect(() => {
    StarVideo();
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: video?.uri }}
        style={styles.video}
        useNativeControls={false}
        rate={playbackSpeed}
        isLooping
        isMuted={isMuted}
        shouldPlay={isPlaying}
        resizeMode="contain"
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      <VideoControls
        onTogglePlayPause={togglePlayPause}
        onToggleMute={toggleMute}
        onTogglePlaybackSpeed={togglePlaybackSpeed}
        onSeek={(value) => {
          videoRef.current.setPositionAsync(+value);
          setCurrentTime(+value);
        }}
        onToggleFullscreen={toggleFullscreen}
        duration={video.duration}
        currentTime={currentTime}
        rate={playbackSpeed}
        isMuted={isMuted}
        shouldPlay={isPlaying}
        fullScreenValue={isFullscreen}
      />
      <TouchableOpacity
        onPress={() => {
          console.log("request to transcrip");
          setShowModal(true);
          togglePlayPause();
        }}
        style={styles.optionButton}
      >
        <MaterialCommunityIcons
          name={"subtitles"}
          color={initialTheme.text}
          size={24}
        />
      </TouchableOpacity>
      <SubtitleModal
        visible={showModal}
        onClose={() => {
          setShowModal(false), togglePlayPause();
        }}
        currentItem={video}
        handleSelected={handleSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: initialTheme.background,
  },
  video: {
    flex: 1,
  },
  text: { color: initialTheme.text },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  optionButton: {
    position: "absolute",
    bottom: hp(3),
    left: wp(5),
  },
});

export default Player;

// Here uri means the url of the video you captured
// const CreateFormData = (uri) => {
//   const form = new FormData();
//   form.append("File", {
//     name: "SampleVideo.mp4",
//     uri: uri,
//     type: "video/mp4",
//   });

// Now perform a post request here by adding this form in the body part of the request
// Then you can handle the file you sent in the backend i.e server
// };
