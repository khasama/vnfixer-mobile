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
const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);

  const handleLogout = () => {
    dispatch(logout())
      .then(unwrapResult)
      .then(() => {
        navigation.navigate("HomeScreen");
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("AuthScreen");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Header allowBack={false} />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <Image
            style={{
              width: width,
              height: width / 2,
              position: "absolute",
            }}
            source={require("../../assets/bg.jpg")}
          />
          <View
            style={{
              width: width,
              height: width / 2,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <Image
                style={{
                  width: width / 5,
                  height: width / 5,
                  resizeMode: "contain",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                }}
                source={require("../../assets/unknow.jpg")}
              />
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <View style={{ height: width / 5 }}>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 17 }}
                  numberOfLines={1}
                >
                  Email: {currentUser.email}
                </Text>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 17 }}
                >
                  Họ tên: {currentUser.fullName}
                </Text>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 17 }}
                >
                  Số điện thoại: {currentUser.phone}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            padding: 10,
            width: width,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.navigate("InformationScreen")}
          >
            <View>
              <Ionicons
                name="information-circle-sharp"
                size={30}
                color="#3d3d3d"
              />
            </View>
            <View>
              <Text style={styles.menuTitle}>Thông tin cá nhân</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.navigate("MyRequestsScreen")}
          >
            <View>
              <Ionicons name="hammer-sharp" size={30} color="#3d3d3d" />
            </View>
            <View>
              <Text style={styles.menuTitle}>Yêu cầu của bạn</Text>
            </View>
          </TouchableOpacity>

          {currentUser.branchId &&
            currentUser.agencyRole === AgencyRoleType.MANAGER && (
              <TouchableOpacity style={styles.menu}>
                <View>
                  <Ionicons name="construct" size={30} color="#3d3d3d" />
                </View>
                <View>
                  <Text style={styles.menuTitle}>Đại lý</Text>
                </View>
              </TouchableOpacity>
            )}

          {currentUser.branchId &&
            currentUser.agencyRole === AgencyRoleType.STAFF && (
              <TouchableOpacity
                style={styles.menu}
                onPress={() => navigation.navigate("TakeRequestScreen")}
              >
                <View>
                  <Ionicons name="construct" size={30} color="#3d3d3d" />
                </View>
                <View>
                  <Text style={styles.menuTitle}>Nhận yêu cầu</Text>
                </View>
              </TouchableOpacity>
            )}

          {isLoggedIn && (
            <TouchableOpacity style={styles.menu} onPress={handleLogout}>
              <View>
                <Ionicons name="log-out" size={30} color="#3d3d3d" />
              </View>
              <View>
                <Text style={styles.menuTitle}>Đăng xuất</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  menu: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    marginVertical: 10,
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#616162",
  },
  menuTitle: {
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 10,
    color: "#3d3d3d",
  },
});
