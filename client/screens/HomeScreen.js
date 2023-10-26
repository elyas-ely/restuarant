import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  t,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Categories from "../components/categories";
import FeatureRow from "../components/featuredRow";
import { getFeaturedRestaurants } from "../api";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import BasketIcon from ".././components/basketIcon";
import { selectBasketItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import { setItem } from "../utils/restaurantStorage";
import { getItem } from "../utils/restaurantStorage";

export default function HomeScreen() {
  const basketItems = useSelector(selectBasketItems);

  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    if (featuredCategories.length != 0) {
      // console.log("data is ", featuredCategories);
      getItem();
    } else {
      getFeaturedRestaurants().then((data) => {
        setFeaturedCategories(data);
        // console.log(data);
        setItem(featuredCategories);
      });
    }
  }, []);

  const cartHandler = () => {
    if (basketItems.length !== 0) {
      navigation.navigate("Cart");
    }
  };

  return (
    <>
      {/* <BasketIcon /> */}
      <SafeAreaView className="bg-slate-100 py-6 relative">
        <StatusBar
          backgroundColor={themeColors.bgColor(0.2)}
          barStyle="dark-content"
        />
        {/* search bar */}
        <View className="flex-row items-center space-x-2 px-4 pb-2 ">
          <TouchableOpacity
            className=" mr-3 rounded-full relative "
            onPress={() => cartHandler()}
            // onPress={getItem}
          >
            <Icon.ShoppingCart
              height={40}
              width={40}
              strokeWidth="2.5"
              stroke={themeColors.bgColor(1)}
            />
            <View
              className="w-7 h-7  absolute -top-1 -right-1 items-center justify-center rounded-full border-2 border-slate-100"
              style={{
                backgroundColor: themeColors.bgColor(1),
                // border: 2,
                // borderColor: "white",
              }}
            >
              <Text
                // style={{ color: themeColors.text }}
                className="text-xs"
              >
                {basketItems.length}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
            <View className="flex-row items-center space-x-1 border-0 border-r-2 pr-2 border-r-gray-300">
              <Text className="text-gray-600">کندهار</Text>
              <Icon.MapPin height="20" width="20" stroke="gray" />
            </View>
            <TextInput
              placeholder="خواړه"
              className="mr-2 flex-1"
              keyboardType="default"
              onChangeText={(text) => textInputHandler(text)}
              // onChangeText={(text) => console.log(text)}
            />
            <Icon.Search height="25" width="25" stroke="gray" />
          </View>
        </View>

        {/* main */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          style={{ scaleX: -1 }}
        >
          {/* categories */}
          <Categories />

          {/* featured */}
          <View className="mt-5">
            {featuredCategories?.map((category) => {
              return (
                <FeatureRow
                  key={category._id}
                  id={category._id}
                  title={category.name}
                  restaurants={category.restaurants}
                  description={category.description}
                  featuredCategory={category._type}
                  // textInputHandler={textInputHandler}
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
