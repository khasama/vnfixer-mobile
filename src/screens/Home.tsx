import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import Header from "../components/Header/Header";
import Section from "../components/Section/Section";

const Home = () => {
  const insets = useSafeAreaInsets();
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
