import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Folder from "../pages/Folder";
import VideoList from "../pages/VideoList";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Playlist from "../pages/Playlist";
import Player from "../pages/Player";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { mainColor } from "../constantes/colorConstante";
import { initialTheme } from "../constantes/Theme";

const Tab = createBottomTabNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const TabBarNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Folder") {
            iconName = "folder";
          } else if (route.name === "VideoList") {
            iconName = "video";
          } else if (route.name === "PlayList") {
            iconName = "playlist-play";
          } else if (route.name === "Player") {
            iconName = "play-box-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: mainColor,
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: "flex",
          backgroundColor: initialTheme.background,
          borderTopWidth: 0, // Pour supprimer la bordure supérieure de la tabBar
          elevation: 0, // Pour supprimer l'ombre sur Android
          shadowOpacity: 0, //
        },
      })}
    >
      <Tab.Screen
        name="Folder"
        component={Folder}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />

      <Tab.Screen
        name="VideoList"
        component={VideoList}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Tab.Screen
        name="PlayList"
        component={Playlist}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Tab.Navigator>
  );
};

//stack variable
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={TabBarNavigation}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{
            headerShown: true,
            transitionSpec: {
              open: config,
              close: config,
            },
          }} // Affichez ou cachez l'en-tête comme vous le souhaitez
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: initialTheme.background,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default AppNavigation;
