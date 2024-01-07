import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../components/Header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import getAgencies from "../api/getAgencies";
import Card from "../components/Card/Card";
import { IAgency, cityDistrict } from "../constants/type";
import { useSelector } from "react-redux";
import { categoriesSelector } from "../redux/selectors";
const { width, height } = Dimensions.get("window");
const Service = () => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [agencies, setAgencies] = useState<IAgency[]>([]);
  const categories = useSelector(categoriesSelector);

  const callApiGetAgencies = useCallback(async (filter: object) => {
    const agencies = await getAgencies(filter);
    setAgencies(agencies.data.entries);
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10,
            }}
          >
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
                width: "47%",
              }}
              onSelect={(selectedItem, index) => {
                setAgencies([]);
                setSelectedCategory(selectedItem.id);
                const filter: any = { categoryId: selectedItem.id };
                if (selectedCity) {
                  filter["city"] = selectedCity;
                }
                callApiGetAgencies(filter);
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
            <SelectDropdown
              data={cityDistrict}
              defaultButtonText={"Thành phố"}
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
                width: "47%",
              }}
              onSelect={(selectedItem, index) => {
                const city = selectedItem.city;
                setAgencies([]);
                setSelectedCity(city);
                const filter: any = { city };
                if (selectedCategory) {
                  filter["categoryId"] = selectedCategory;
                }
                callApiGetAgencies(filter);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.city;
              }}
              rowTextForSelection={(item, index) => {
                return item.city;
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
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              width: "100%",
            }}
          >
            {!!agencies.length &&
              agencies.map((e) => <Card key={e.id} agency={e} />)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Service;

const styles = StyleSheet.create({});
