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
                  width: width / 3,
                  resizeMode: "contain",
                }}
                source={{
                  uri: `data:image/png;base64,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`,
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
