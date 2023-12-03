import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Agency from "../screens/Agency";
import Service from "../screens/Service";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Home">
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="Profile"
    >
      <Stack.Screen name="ProfileScreen" component={Profile} />
    </Stack.Navigator>
  );
};

const AgencyStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="Agency"
    >
      <Stack.Screen name="AgencyScreen" component={Agency} />
    </Stack.Navigator>
  );
};

const ServiceStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="Service"
    >
      <Stack.Screen name="ServiceScreen" component={Service} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  ProfileStackNavigator,
  ServiceStackNavigator,
  AgencyStackNavigator,
};
