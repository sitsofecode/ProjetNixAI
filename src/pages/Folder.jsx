import { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { initialTheme } from "../constantes/Theme";
export default function Folder() {
  const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (!permissionResponse || permissionResponse.status !== "granted") {
      const response = await requestPermission();
      if (response.status !== "granted") {
        // Gérer le cas où la permission est refusée
        return;
      }
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    console.log(fetchedAlbums);
    setAlbums(fetchedAlbums);
  }

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const itemsPerRow = 3;

  return (
    <SafeAreaView style={{ backgroundColor: initialTheme.background }}>
      <Text style={styles.text}>
        <MaterialCommunityIcons
          name="play-box-multiple"
          color={initialTheme.color}
          size={hp(5)}
        />{" "}
        Nix video player
      </Text>
      <ScrollView>
        <View
          style={[
            styles.gridContainer,
            {
              justifyContent:
                itemsPerRow === 3 ? "space-around" : "space-between",
            },
          ]}
        >
          {albums &&
            albums.map((album) => {
              return (
                <TouchableWithoutFeedback
                  key={album.id}
                  onPress={() => {
                    console.log("acces a album");
                  }}
                >
                  <View style={styles.gridItem}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name="folder-image"
                        size={hp(10)}
                        color="black"
                      />
                    </View>
                    <Text>{album.title}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: initialTheme.background,
    gap: 8,
    justifyContent: "center",
  },

  albumContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 4,
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    color: initialTheme.text,
    marginTop: hp(2),
    marginHorizontal: wp(5),
    fontSize: hp(5),
  },
  container: {
    flex: 1,
    padding: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  gridItem: {
    width: wp(45) - 15,
    marginVertical: 10,
    alignItems: "center",
    borderColor: initialTheme.background,
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    borderRadius: wp(5),
    backgroundColor: initialTheme.input,
  },
  iconContainer: {
    marginBottom: 5,
  },
});
