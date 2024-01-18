import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
const { width, height } = Dimensions.get("window");
const AgencySection = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => {
          // setGenresOpen(!genresOpen);
        }}
      >
        <Text
          style={{
            fontSize: 15,
          }}
        >
          Sửa xe máy
        </Text>
        <Text
          style={[
            {
              fontSize: 15,
            },
            { right: 0 },
          ]}
        >
          {true ? (
            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
          ) : (
            <Ionicons name="chevron-down-outline" size={20} color="#000" />
          )}
        </Text>
      </TouchableOpacity>
      <View
        style={[
          { flexDirection: "row", flexWrap: "wrap" },
          true ? { display: "flex" } : { display: "none" },
        ]}
      >
        <TouchableOpacity
          style={{
            width: width / 2.5,
            margin: 5,
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View>
            <Image
              style={{
                height: width / 2.5,
                resizeMode: "cover",
              }}
              source={{
                uri: `https://www.motosoft.vn/uploads/files/tin-tuc-phan-mem-motor-net/nghe-sua-xe-may.jpg`,
              }}
            />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>
              Sửa chữa xe máy
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>555 Đại lý</Text>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>555 Yêu cầu</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AgencySection;

const styles = StyleSheet.create({});
