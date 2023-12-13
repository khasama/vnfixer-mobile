import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

type SectionProps = {
  title: string;
  items: object[];
};
const { width, height } = Dimensions.get("window");
const Section = (props: SectionProps) => {
  return (
    <View style={{ padding: 10 }}>
      <View>
        <Text style={{ color: "#616162", fontSize: 18, fontWeight: "600" }}>
          {props.title}
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
          }}
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
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                555 Đại lý
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                555 Yêu cầu
              </Text>
            </View>
          </TouchableOpacity>
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
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                555 Đại lý
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                555 Yêu cầu
              </Text>
            </View>
          </TouchableOpacity>
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
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                555 Đại lý
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                555 Yêu cầu
              </Text>
            </View>
          </TouchableOpacity>
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
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                555 Đại lý
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                555 Yêu cầu
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({});
