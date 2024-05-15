import React, { useState, useRef } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { initialTheme } from "../constantes/Theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ApiServices from "../services/ApiServices";
import { AnimatedTextScreen } from "../components/TextShowScreen";
import * as ImagePicker from "expo-image-picker";
// import 'fs' from 'fs'
export default function ImageText() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  const [Picture, setPicture] = useState(null);
  const cameraRef = useRef(null);
  const [text, setText] = useState(null);

  const options = {
    quality: 0.5,
    base64: true,
    exif: true,
    skipProcessing: true, // Pour éviter le traitement de l'image
    ratio: "16:9", // Définir le ratio pour Android
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync(options);
        console.log(photo);

        const cacheDirectory = FileSystem.cacheDirectory + "photos/";
        await FileSystem.makeDirectoryAsync(cacheDirectory, {
          intermediates: true,
        });
        const fileName = `${Date.now()}.jpg`;
        const filePath = cacheDirectory + fileName;
        await FileSystem.moveAsync({ from: photo.uri, to: filePath });

        setPicture(filePath);

        console.log("Image enregistrée :", filePath);
      } catch (error) {
        console.error("Erreur lors de la capture de la photo :", error);
      }
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const uploadPhotoToServer = async (photoPath) => {
    try {
      const formData = new FormData();
      // const filename = uri.split("/").pop();
      formData.append("photo", photoPath);

      console.log(formData);
      const photoResponse = await ApiServices._sendPhoto(formData);

      console.log("Réponse de l'API:", photoResponse);
      // setText(response.data);
      // Traitez la réponse de l'API ici selon vos besoins
    } catch (error) {
      console.error("Error uploading photo:", error);
      // Handle specific errors here
    }
  };

  if (text) {
    return (
      <View
        style={[styles.container, { backgroundColor: initialTheme.background }]}
      >
        <AnimatedTextScreen text={text} />
        <TouchableOpacity
          onPress={() => {
            console.log("transcrir l'image");
          }}
          style={{
            backgroundColor: initialTheme.text,
            borderRadius: 64,
            position: "absolute",
            bottom: wp(20),
            left: wp(5),
            right: wp(5),
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="transcribe"
            size={wp(10)}
            color={initialTheme.background}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {Picture !== null ? (
        <View style={styles.ImageContainer}>
          <Image
            source={{
              uri: Picture,
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: hp(2),
              resizeMode: "contain",
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setPicture(null);
            }}
            style={{
              position: "absolute",
              top: wp(20),
              left: wp(5),
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left-drop-circle"
              size={wp(7)}
              color={initialTheme.text}
            />
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              onPress={() => {
                uploadPhotoToServer(Picture);
              }}
              style={{
                backgroundColor: initialTheme.text,
                borderRadius: 64,
                position: "absolute",
                bottom: wp(20),
                left: wp(5),
                right: wp(5),
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="transcribe"
                size={wp(10)}
                color={initialTheme.background}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
          <View style={styles.Flibutton}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <FontAwesome6
                name="arrows-rotate"
                size={15}
                color={initialTheme.background}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleTakePicture}>
              <FontAwesome
                name="camera"
                size={hp(5)}
                color={initialTheme.background}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.pickbutton}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <FontAwesome6
                name="image"
                size={15}
                color={initialTheme.background}
              />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  ImageContainer: {
    backgroundColor: initialTheme.background,
    height: hp(100),
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    margin: wp(2),
    position: "absolute",
    bottom: wp(5),
    left: wp(40),
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 64,
    padding: 10,
    backgroundColor: initialTheme.text,
  },
  text: {
    fontSize: hp(5),
    fontWeight: "bold",
    color: initialTheme.text,
  },
  Flibutton: {
    backgroundColor: "transparent",
    margin: wp(2),
    position: "absolute",
    bottom: wp(5),
    left: wp(2),
  },
  pickbutton: {
    backgroundColor: "transparent",
    margin: wp(2),
    position: "absolute",
    bottom: wp(5),
    right: wp(2),
  },
});
