import AsyncStorage from "@react-native-async-storage/async-storage";

const load = {
  loading: false,
  async setLoading(value) {
    try {
      await AsyncStorage.setItem("loading", value.toString());
    } catch (e) {
      console.error("Error setting loading state:", e);
    }
  },
  async getLoading() {
    try {
      const value = await AsyncStorage.getItem("loading");
      return value !== null ? value === "true" : false;
    } catch (e) {
      console.error("Error getting loading state:", e);
      return false;
    }
  },
};
