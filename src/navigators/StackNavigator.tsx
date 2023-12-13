import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Agencies from "../screens/Agencies";
import Service from "../screens/Service";
import Agency from "../screens/Agency";
import Profile from "../screens/Profile";
import { NavigationProp } from "@react-navigation/native";

export type ScreenNames = [
  "HomeScreen",
  "ProfileScreen",
  "AgenciesScreen",
  "ServiceScreen",
  "AgencyScreen"
];
export type RootStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  AgenciesScreen: undefined;
  ServiceScreen: undefined;
  AgencyScreen: { id: string };
};
export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();
const screenOptionStyle = {
  headerShown: false,
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="ProfileScreen"
    >
      <Stack.Screen name="ProfileScreen" component={Profile} />
    </Stack.Navigator>
  );
};

const AgenciesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="AgenciesScreen"
    >
      <Stack.Screen name="AgenciesScreen" component={Agencies} />
    </Stack.Navigator>
  );
};

const ServiceStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="ServiceScreen"
    >
      <Stack.Screen name="ServiceScreen" component={Service} />
      <Stack.Screen name="AgencyScreen" component={Agency} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  ProfileStackNavigator,
  ServiceStackNavigator,
  AgenciesStackNavigator,
};
