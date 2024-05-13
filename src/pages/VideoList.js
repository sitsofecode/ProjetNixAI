import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  View,
  VideoPlayer,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";
import { VideoContext } from "../context/videoContext";
import { LayoutProvider, RecyclerListView } from "recyclerlistview";
import OptionalModal from "../components/OptionalModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Video } from "expo-av";

const VideoList = ({ navigation }) => {
  const { videoFiles } = useContext(VideoContext);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const formatDuration = (duration) => {
    // Fonction pour formater la durée de la vidéo (vous pouvez personnaliser selon vos besoins)
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
        style={styles.singleItem}
      >
        <View key={item.id}>
          <Image
            source={{ uri: item.uri }}
            style={{ width: "100%", height: "80%", resizeMode: "cover" }}
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
            <MaterialCommunityIcons name="menu" color="gray" size={20} />
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
            <RecyclerListView
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              rowRenderer={rowRenderer}
              style={{ flex: 1 }}
            />
            <OptionalModal
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
  },
  singleItem: {
    width: Dimensions.get("window").width / 2 - 20,
    padding: 10,
    margin: 20,
    textAlign: "center",
    borderRadius: 5,
  },
  videoName: {
    fontSize: 16,
    marginTop: 5,
  },
  videoDuration: {
    fontSize: 10,
    color: "#888888",
    marginTop: 1,
  },
  optionButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default VideoList;
