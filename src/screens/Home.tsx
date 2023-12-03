import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import Header from "../components/Header/Header";

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Header allowBack={false} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
