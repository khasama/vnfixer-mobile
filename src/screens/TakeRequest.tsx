import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector, isLoggedInSelector } from "../redux/selectors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type StackNavigation } from "../navigators/StackNavigator";
import { AgencyRoleType } from "../constants/type";
import { logout } from "../redux/reducers/auth";
import { AppDispatch } from "../redux/store";
import { unwrapResult } from "@reduxjs/toolkit";

const { width, height } = Dimensions.get("window");
const TakeRequest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();
  const currentUser = useSelector(currentUserSelector);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Header allowBack={true} />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text>Nhận Yêu cầu</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TakeRequest;

const styles = StyleSheet.create({});
