import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../slices/basketSlice";
import { selectRestaurant } from "../slices/restaurantSlice";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function BasketScreen() {
  // const restaurant = useSelector(selectRestaurant);
  const [groupedItems, setGroupedItems] = useState([]);
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const deliveryFee = 10;
  useMemo(() => {
    const gItems = basketItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(gItems);
    // console.log('items: ',gItems);
  }, [basketItems]);

  return (
    <View className=" bg-white flex-1 pt-4">
      {/* top button */}
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          onPress={navigation.goBack}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
        >
          <Icon.ArrowLeft
            strokeWidth={3}
            stroke="white"
          />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">ستاسو خوراکونه</Text>
          {/* <Text className="text-center text-gray-500">{restaurant.title}</Text> */}
        </View>
      </View>

      {/* delivery time */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
        className="flex-row px-4 items-center justify-between"
      >
        <Image
          source={require("../assets/images/bikeGuy.png")}
          className="w-20 h-20 rounded-full"
        />
        <Text className="">په ۲۰ - ۳۰ دقیقو کي ستاسو تر کوره</Text>
        <TouchableOpacity>
          <Text
            style={{ color: themeColors.text }}
            className="font-bold text-center"
            onPress={() => navigation.goBack()}
          >
            تغیرول
          </Text>
        </TouchableOpacity>
      </View>

      {/* dishes */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white pt-5"
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {Object.entries(groupedItems).map(([key, items]) => {
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
            >
              <Text className="font-semibold text-base">
                <Image
                  source={require("../assets/images/af.png")}
                  className="w-5 h-5"
                />{" "}
                {items[0]?.price}
              </Text>
              <Text className="flex-1 font-bold text-gray-700">
                {items[0]?.name}
              </Text>
              <Image
                className="h-14 w-14 rounded-full"
                source={{ uri: urlFor(items[0]?.image).url() }}
              />
              <Text
                style={{ color: themeColors.text }}
                className="font-bold"
              >
                {items.length} x{" "}
              </Text>
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
                onPress={() => dispatch(removeFromBasket({ id: items[0]?.id }))}
              >
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* totals */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
        className=" p-6 px-8 rounded-t-3xl space-y-4"
      >
        <View className="flex-row justify-between">
          <Text className="text-gray-700">
            <Image
              source={require("../assets/images/af.png")}
              className="w-5 h-5 mr-2"
            />
            {" " + basketTotal}
          </Text>
          <Text className="text-gray-700">د خوراکونو مجموعه</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">
            <Image
              source={require("../assets/images/af.png")}
              className="w-5 h-5 mr-2"
            />
            {" " + deliveryFee}
          </Text>
          <Text className="text-gray-700">د لاری مصرف</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-extrabold">
            <Image
              source={require("../assets/images/af.png")}
              className="w-5 h-5"
            />{" "}
            {basketTotal + deliveryFee}
          </Text>
          <Text className="font-extrabold">مکمله مجموعه</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgColor(1) }}
            onPress={() => navigation.navigate("PreparingOrder")}
            className="p-3 rounded-full"
          >
            <Text className="text-white text-center font-bold text-lg">
              اډر واستوئ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
