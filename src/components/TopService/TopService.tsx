import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ICategory } from "../../constants/type";

const { width, height } = Dimensions.get("window");

const TopService = ({ category }: { category: ICategory }) => {
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{
          width: "100%",
          marginVertical: 5,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
          justifyContent: "center",
        }}
      >
        <View style={{ height: "auto" }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }} numberOfLines={1}>
            {category.name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            {category.agencies?.length} Đại lý
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            555 Yêu cầu hoàn thành
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TopService;

const styles = StyleSheet.create({});
