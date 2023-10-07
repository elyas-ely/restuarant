import { View, Text, StatusBar, Image } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import Lottie from "lottie-react-native";

export default function PreparingOrderScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 3000);
  }, []);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Lottie
        source={require("../assets/animations/delivery.json")}
        autoPlay
        loop
      />
    </View>
  );
}
