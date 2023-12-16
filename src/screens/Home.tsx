import { ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Section from "../components/Section/Section";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getCategories } from "../redux/reducers/category";
import { AppDispatch } from "../redux/store";

const Home = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCategories())
      .then(unwrapResult)
      .catch((err: string) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
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
        <View>
          <Section title={"Dịch vụ nổi bật"} items={[]} />
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
  );
};

export default Home;

const styles = StyleSheet.create({});
