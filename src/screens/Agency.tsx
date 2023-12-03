import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/Header";

const Agency = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Header allowBack={false} />
    </View>
  );
};

export default Agency;

const styles = StyleSheet.create({});
