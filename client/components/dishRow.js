import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsById,
} from "../slices/basketSlice";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { createSelector } from "@reduxjs/toolkit";

export default function DishRow({ name, description, id, price, image }) {
  const dispatch = useDispatch();
  const basketItems = useSelector((state) => selectBasketItemsById(state, id));
  // const basketItems = createSelector((state) =>
  //   selectBasketItemsById(state, id)
  // );
  const handleIncrease = () => {
    dispatch(addToBasket({ id, name, price, image, description }));
  };
  const handleDecrease = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <View className="flex flex-1 space-y-3">
          <View className="pr-3">
            <Text className="text-xl ">{name}</Text>
            <Text className="text-gray-700">{description}</Text>
          </View>
          <View className="flex-row pr-3 justify-between items-center">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={handleDecrease}
                disabled={!basketItems.length}
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
              <Text className="px-3">{basketItems.length}</Text>

              <TouchableOpacity
                onPress={handleIncrease}
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Icon.Plus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row">
              <Text className="text-gray-700 text-lg font-bold">
                <Image
                  source={require("../assets/images/af.png")}
                  className="w-5 h-5 mr-2"
                />{" "}
                {price}
              </Text>
            </View>
          </View>
        </View>
        <Image
          className="rounded-3xl"
          style={{ height: 100, width: 100 }}
          source={{
            uri: urlFor(image).url(),
          }}
        />
      </View>
    </>
  );
}
