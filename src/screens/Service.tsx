import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Service = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Header allowBack={false} />
    </View>
  );
};

export default Service;

const styles = StyleSheet.create({});
