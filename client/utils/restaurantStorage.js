import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("key", value);
  } catch (e) {
    console.warn("Error storing value:", e);
  }
  // console.warn("data stored");
};

export const getItem = async () => {
  try {
    const data = await AsyncStorage.getItem("key");
  } catch (e) {
    console.warn("Error retrieving value: ");
  }
  // console.warn(data);
};

export const removeItem = async () => {
  try {
    await AsyncStorage.multiRemove("key");
  } catch (error) {
    console.warn("Error deleting value: ", error);
  }
};
