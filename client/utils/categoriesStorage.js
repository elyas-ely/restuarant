import AsyncStorage from "@react-native-async-storage/async-storage";

export const storingData = async (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error("categoriAsyncStorage: Error storing data:", error);
  }
};

export const gettingData = async (key) => {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    return stringValue !== null ? JSON.parse(stringValue) : null;
  } catch (error) {
    console.error("categoriAsyncStorage: Error getting data");
  }
};
