import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";
import { VideoContext } from "../context/videoContext";
import { LayoutProvider, RecyclerListView } from "recyclerlistview";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { initialTheme } from "../constantes/Theme";
import VideoModal from "../components/VideoModal";
const VideoList = ({ navigation }) => {
  const { videoFiles } = useContext(VideoContext);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const OnVideoPress = async (video) => {
    // console.log(video);
    navigation.navigate("Player", video);
    // const playbackObject = await Video.createAsync({ uri: videoURI });
    // await playbackObject.playAsync();
  };

  const layoutProvider = new LayoutProvider(
    (i) => "video",
    (type, dim) => {
      switch (type) {
        case "video":
          dim.width = Dimensions.get("window").width / 2 - 20;
          dim.height = 200;
          break;

        default:
          dim.width = Dimensions.get("window").width / 2 - 20;
          dim.height = 200;
          break;
      }
    }
  );

  const rowRenderer = (type, item) => {
    return (
      <TouchableWithoutFeedback
        underlayColor="#DDDDDD"
        onPress={() => OnVideoPress(item)}
      >
        <View key={item.id} style={styles.singleItem}>
          <Image
            source={{
              uri: item.uri,
              // uri: "https://img.freepik.com/photos-gratuite/prise-vue-au-grand-angle-seul-arbre-poussant-sous-ciel-assombri-pendant-coucher-soleil-entoure-herbe_181624-22807.jpg",
            }}
            style={{
              width: "100%",
              height: "80%",
              resizeMode: "cover",
              borderRadius: hp(2),
            }}
          />

          <Text numberOfLines={1} style={styles.videoName}>
            {item.filename}
          </Text>
          <Text style={styles.videoDuration}>
            {formatDuration(item.duration)}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
              setCurrentItem(item);
            }}
            style={styles.optionButton}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              color={initialTheme.input}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <VideoContext.Consumer>
      {({ dataProvider }) => {
        return (
          <View style={styles.container}>
            <Text style={styles.text}>
              <MaterialCommunityIcons
                name="play-box-multiple"
                color={initialTheme.color}
                size={hp(5)}
              />{" "}
              Nix video player
            </Text>
            <RecyclerListView
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              rowRenderer={rowRenderer}
              style={{ flex: 1 }}
            />
            <VideoModal
              visible={showModal}
              onClose={() => setShowModal(false)}
              currentItem={currentItem}
            />
          </View>
        );
      }}
    </VideoContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: initialTheme.background,
    justifyContent: "center",
  },
  singleItem: {
    width: Dimensions.get("window").width / 2 - 10,
    padding: 10,
    marginHorizontal: 10,
    textAlign: "center",
    borderRadius: hp(2),
  },
  videoName: {
    fontSize: 16,
    marginTop: 5,
    color: initialTheme.text,
  },
  videoDuration: {
    fontSize: 10,
    color: "#888888",
    marginTop: 1,
  },
  optionButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  text: {
    color: initialTheme.text,
    marginTop: hp(2),
    marginHorizontal: wp(5),
    fontSize: hp(5),
  },
});

export default VideoList;
