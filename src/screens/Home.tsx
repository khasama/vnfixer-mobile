import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: "red", paddingTop: insets.top }}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
