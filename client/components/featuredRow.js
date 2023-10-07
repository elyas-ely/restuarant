import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./restaurantCard";
import { getFeaturedRestaurantById } from "../api";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function FeatureRow({ id, title, description, restaurants }) {
  // const textInputHandler = (text) => {
  //   restaurants.filter((restaurant) => restaurant.name.includes(text));
  // };
  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <TouchableOpacity>
          <Text
            style={{ color: themeColors.text }}
            className="font-semibold"
          >
            ټوله ووینئ
          </Text>
        </TouchableOpacity>
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-500 text-xs">{description}</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="overflow-visible py-5"
        style={{ transform: [{ scaleX: -1 }] }}
      >
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              type={restaurant.type?.name}
              address="123 main street"
              description={restaurant.description}
              dishes={restaurant.dishes}
              lng={restaurant.lng}
              lat={restaurant.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
