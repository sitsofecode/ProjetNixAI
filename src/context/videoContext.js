import React, { createContext, useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Alert, StyleSheet, Text, View } from "react-native";
import { DataProvider } from "recyclerlistview";

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoFiles, setVideoFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);

  const permissionAlert = () => {
    Alert.alert(
      "Permission Required",
      "This app needs permission to read files",
      [
        {
          text: "I am ready",
          onPress: () => getPermission(),
        },
        {
          text: "Cancel",
          onPress: () => permissionAlert(),
        },
      ]
    );
  };

  const getVideoFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "video",
    });
    // media = await MediaLibrary.getAssetsAsync({
    //   mediaType: "video",
    //   first: media.totalCount,
    // });
    setVideoFiles(media.assets);
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      getVideoFiles();
    } else if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        permissionAlert();
      } else if (status === "granted") {
        getVideoFiles();
      } else if (status === "denied" && !canAskAgain) {
        setPermissionError(true);
      }
    } else {
      setPermissionError(true);
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
    videoFiles
  );
  return permissionError ? (
    <View style={styles.container}>
      <Text>Nous n'avons pas l'acces a vos donner </Text>
    </View>
  ) : (
    <VideoContext.Provider value={{ videoFiles, dataProvider }}>
      {children}
    </VideoContext.Provider>
  );
};
export default VideoProvider;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    Colors: "red",
    textAlign: "center",
  },
});
