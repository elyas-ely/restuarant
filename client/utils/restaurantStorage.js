import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error("RestaurantAsyncStorage: Error storing data:", error);
  }
};

export const getData = async (key) => {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    return stringValue !== null ? JSON.parse(stringValue) : null;
  } catch (error) {
    console.error("RestaurantAsyncStorage: Error getting data");
  }
};
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data from AsyncStorage:", error);
  }
};
