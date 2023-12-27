import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Notification from "../screens/Notification";
import Service from "../screens/Service";
import Agency from "../screens/Agency";
import Profile from "../screens/Profile";
import Auth from "../screens/Auth";
import TakeRequest from "../screens/TakeRequest";
import Information from "../screens/Information";
import MyRequests from "../screens/MyRequests";
import { NavigationProp } from "@react-navigation/native";

export type ScreenNames = [
  "HomeScreen",
  "ProfileScreen",
  "NotificationScreen",
  "ServiceScreen",
  "AgencyScreen",
  "AuthScreen"
];
export type RootStackParamList = {
  HomeScreen: undefined;
  AuthScreen: undefined;
  ProfileScreen: undefined;
  NotificationScreen: undefined;
  ServiceScreen: undefined;
  AgencyScreen: { id: string };
  TakeRequestScreen: undefined;
  InformationScreen: undefined;
  MyRequestsScreen: undefined;
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
      <Stack.Screen name="AuthScreen" component={Auth} />
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
      <Stack.Screen name="AuthScreen" component={Auth} />
      <Stack.Screen name="TakeRequestScreen" component={TakeRequest} />
      <Stack.Screen name="InformationScreen" component={Information} />
      <Stack.Screen name="MyRequestsScreen" component={MyRequests} />
    </Stack.Navigator>
  );
};

const NotificationStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="NotificationScreen"
    >
      <Stack.Screen name="NotificationScreen" component={Notification} />
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
  NotificationStackNavigator,
};
