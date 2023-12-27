import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
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
import { AgencyRoleType, IUser } from "../constants/type";
import { logout, updateInfo } from "../redux/reducers/auth";
import { AppDispatch } from "../redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";

const { width, height } = Dimensions.get("window");
const Information = () => {
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
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 18,
              marginLeft: 10,
              color: "#3d3d3d",
              textAlign: "center",
            }}
          >
            Thông tin cá nhân
          </Text>
        </View>
        <View
          style={{
            width: "90%",
          }}
        >
          <Formik
            initialValues={{
              phone: currentUser?.phone || "",
              fullName: currentUser?.fullName || "",
            }}
            onSubmit={(values) => {
              const data = values as IUser;
              dispatch(updateInfo(data))
                .then(unwrapResult)
                .then((result) => {
                  ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
                })
                .catch((err: any) => {
                  ToastAndroid.show(err?.message, ToastAndroid.SHORT);
                });
            }}
          >
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
              <View>
                <TextInput
                  style={{
                    width: "100%",
                    marginVertical: 5,
                  }}
                  mode="outlined"
                  label={<Text style={{}}>Email</Text>}
                  value={currentUser?.email}
                  editable={false}
                />
                <TextInput
                  style={{
                    width: "100%",
                    marginVertical: 5,
                  }}
                  mode="outlined"
                  label={<Text style={{}}>Họ tên</Text>}
                  onChangeText={handleChange("fullName")}
                  value={values.fullName}
                />

                <TextInput
                  style={{
                    width: "100%",
                    marginVertical: 5,
                  }}
                  mode="outlined"
                  label={<Text style={{}}>Số điện thoại</Text>}
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                />

                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Button
                    icon={({ size, color }) => (
                      <Ionicons name="build-outline" size={size} color="#fff" />
                    )}
                    mode="contained"
                    uppercase={false}
                    style={{
                      backgroundColor: "#e3a432",
                    }}
                    onPress={
                      handleSubmit as unknown as (
                        e: GestureResponderEvent
                      ) => void
                    }
                  >
                    Lưu
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({});
