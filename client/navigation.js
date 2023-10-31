import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CartScreen from "./screens/CartScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Test from "./screens/test";
import { getItem } from "./utils/asyncStorage";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(true);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }
  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          {/* <Stack.Navigator initialRouteName="Home"> */}
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={OnboardingScreen}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // component={Test}
          />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Cart"
            options={{ presentation: "modal", headerShown: false }}
            component={CartScreen}
          />
          <Stack.Screen
            name="PreparingOrder"
            options={{ presentation: "fullScreenModal", headerShown: false }}
            component={PreparingOrderScreen}
          />
          <Stack.Screen
            name="Delivery"
            options={{ presentation: "fullScreenModal", headerShown: false }}
            component={DeliveryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={OnboardingScreen}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // component={Test}
          />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Cart"
            options={{ presentation: "modal", headerShown: false }}
            component={CartScreen}
          />
          <Stack.Screen
            name="PreparingOrder"
            options={{ presentation: "fullScreenModal", headerShown: false }}
            component={PreparingOrderScreen}
          />
          <Stack.Screen
            name="Delivery"
            options={{ presentation: "fullScreenModal", headerShown: false }}
            component={DeliveryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
