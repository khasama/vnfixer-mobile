import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import SelectDropdown from "react-native-select-dropdown";
import getCategories from "../api/getCategories";
import getAgencies from "../api/getAgencies";
import Ionicons from "@expo/vector-icons/Ionicons";
import Card from "../components/Card/Card";

const Agencies = () => {
  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState([]);
  const [agencies, setAgencies] = useState([]);

  const callApiGetCategories = useCallback(async () => {
    const categories = await getCategories();
    setCategories(categories.data);
  }, []);

  const callApiGetAgencies = useCallback(async (categoryId: string) => {
    const agencies = await getAgencies({ categoryId });
    setAgencies(agencies.data.entries);
  }, []);

  useEffect(() => {
    callApiGetCategories();
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
        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: "#616162", fontSize: 18, fontWeight: "600" }}>
            Tất cả dịch vụ
          </Text>
        </View>
        <View style={{ width: "100%", padding: 10 }}>
          <SelectDropdown
            data={categories}
            defaultButtonText={"Dịch vụ"}
            rowTextStyle={{
              color: "#000",
              textAlign: "left",
            }}
            buttonTextStyle={{
              color: "#000",
              textAlign: "left",
            }}
            dropdownIconPosition={"right"}
            selectedRowStyle={{ backgroundColor: "#fff" }}
            buttonStyle={{
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 10,
              width: "100%",
            }}
            onSelect={(selectedItem, index) => {
              setAgencies([]);
              callApiGetAgencies(selectedItem.id);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
            renderDropdownIcon={() => {
              return (
                <Ionicons
                  name="chevron-down-outline"
                  size={25}
                  color={"#000"}
                />
              );
            }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              width: "100%",
            }}
          >
            {!!agencies &&
              agencies.map((e) => <Card key={e["id"]} agency={e} />)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Agencies;

const styles = StyleSheet.create({});
