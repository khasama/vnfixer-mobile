import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header/Header";
import Section from "../components/Section/Section";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getCategories } from "../redux/reducers/category";
import { AppDispatch } from "../redux/store";
import { categoriesSelector, isLoggedInSelector } from "../redux/selectors";
import TopService from "../components/TopService/TopService";
import { Button, Provider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import CreateRequestModal from "../components/Modals/CreateRequestModal";
import CreateRequest from "../components/CreateRequest";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigation } from "../navigators/StackNavigator";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();
  const categories = useSelector(categoriesSelector);
  const dispatch = useDispatch<AppDispatch>();
  const [visibleCreateRequestModal, setVisibleCreateRequestModal] =
    useState(false);
  const isLoggedIn = useSelector(isLoggedInSelector);

  const topService = useMemo(() => {
    return categories.slice(0, 4);
  }, [categories]);

  useEffect(() => {
    dispatch(getCategories())
      .then(unwrapResult)
      .catch((err: string) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  }, []);

  return (
    <Provider>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <CreateRequest
          agency={null}
          setVisibleCreateRequestModal={setVisibleCreateRequestModal}
          visibleCreateRequestModal={visibleCreateRequestModal}
        />
        <View>
          <Header allowBack={false} />
        </View>
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
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                buttonColor="#4894ef"
                style={{
                  alignSelf: "center",
                  marginBottom: 25,
                }}
                mode="contained"
                uppercase={false}
                onPress={() => {
                  if (!isLoggedIn) {
                    navigation.navigate("AuthScreen");
                  } else {
                    setVisibleCreateRequestModal(true);
                  }
                }}
                icon={({ size, color }) => (
                  <Ionicons name="hammer-outline" size={size} color={color} />
                )}
              >
                Tạo yêu cầu
              </Button>
            </View>
          </View>

          <View>
            <View style={{ padding: 10 }}>
              <View>
                <Text
                  style={{ color: "#616162", fontSize: 18, fontWeight: "600" }}
                >
                  Dịch vụ nổi bật
                </Text>
              </View>
              <View style={{ alignItems: "center", padding: 10 }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    width: "100%",
                    display: "flex",
                  }}
                >
                  {!!topService.length &&
                    topService.map((category) => (
                      <TopService key={category.id} category={category} />
                    ))}
                </View>
              </View>
            </View>
          </View>

          <View>
            <Section title={"Đại lý nổi bật"} items={[]} />
          </View>

          <View>
            <View>
              <Text>Liên kết</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};

export default Home;

const styles = StyleSheet.create({});
