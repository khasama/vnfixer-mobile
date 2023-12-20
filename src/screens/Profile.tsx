import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../redux/selectors";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigation } from "../navigators/StackNavigator";

const Profile = () => {
  const navigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();
  const isLoggedIn = useSelector(isLoggedInSelector);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("AuthScreen");
    }
  }, [isLoggedIn]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Header allowBack={false} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
