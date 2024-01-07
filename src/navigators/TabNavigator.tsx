import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  getFocusedRouteNameFromRoute,
  useRoute,
} from "@react-navigation/native";
import {
  HomeStackNavigator,
  ProfileStackNavigator,
  ServiceStackNavigator,
  NotificationStackNavigator,
} from "./StackNavigator";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const getRouteName = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes("AuthScreen") ||
    routeName?.includes("TakeRequestScreen") ||
    routeName?.includes("InformationScreen") ||
    routeName?.includes("MyRequestsScreen") ||
    routeName?.includes("ManagerScreen") ||
    routeName?.includes("AgencyScreen")
  ) {
    return "none";
  }
  return "flex";
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            size = focused ? size + 5 : size;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            size = focused ? size + 5 : size;
          } else if (route.name === "Service") {
            iconName = focused ? "construct" : "construct-outline";
            size = focused ? size + 5 : size;
          } else if (route.name === "Notification") {
            iconName = focused ? "notifications" : "notifications-outline";
            size = focused ? size + 5 : size;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fc4503",
        tabBarInactiveTintColor: "#000",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 40,
          display: getRouteName(route),
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Service" component={ServiceStackNavigator} />
      <Tab.Screen name="Notification" component={NotificationStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
