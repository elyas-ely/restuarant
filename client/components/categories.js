import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getCategories } from "../api";
import { urlFor } from "../sanity";
import { themeColors } from "../theme";
import { storingData } from "../utils/categoriesStorage";
import { gettingData } from "../utils/categoriesStorage";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await gettingData("categories");
      console.warn("got data for categories");
      if (storedData) {
        // Data is already available, use it
        setCategories(storedData);
      } else {
        // Data is not available, fetch and store it
        console.error("ohh!, Data is not fetched");
        try {
          const fetchedData = await getCategories();
          setCategories(fetchedData);
          storingData("categories", fetchedData);
        } catch (error) {
          console.error("Error fetching and storing data:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <View className="mt-4">
      <ScrollView
        // className="p-4"
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        style={{ transform: [{ scaleX: -1 }] }}
      >
        {categories?.map((category) => {
          let isActive = category._id == activeCategory;
          let btnClass = isActive ? " bg-gray-600" : " bg-gray-200";
          let textClass = isActive
            ? " font-semibold text-gray-800"
            : " text-gray-500";
          return (
            <View
              key={category._id}
              className="flex justify-center items-center mr-6"
              style={{ transform: [{ scaleX: -1 }] }}
            >
              <TouchableOpacity
                onPress={() => setActiveCategory(category._id)}
                className={"p-1 rounded-full shadow" + btnClass}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  source={{
                    uri: urlFor(category.image).url(),
                  }}
                />
              </TouchableOpacity>
              <Text className={"text-sm " + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
