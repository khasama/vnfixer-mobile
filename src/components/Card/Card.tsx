import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import { IAgency } from "../../constants/type";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigation } from "../../navigators/StackNavigator";

const { width, height } = Dimensions.get("window");

type CardProps = {
  agency: IAgency;
};

const Card = (props: CardProps) => {
  const navigation = useNavigation<StackNavigation>();
  const countRequest = useMemo(() => {
    let count = 0;
    props.agency.branches?.map((branch) => {
      count += branch.requests?.length;
    });
    return count;
  }, [props]);
  const imageSource = useMemo(() => {
    if (props.agency.logo) {
      return {
        uri: props.agency.logo,
      };
    }
    return require("../../../assets/logo.jpg");
  }, [props]);
  return (
    <View>
      <TouchableOpacity
        style={{
          width: width / 2.5,
          margin: 5,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate("AgencyScreen", {
            id: props.agency.id,
          });
        }}
      >
        <View>
          <Image
            style={{
              height: width / 2.5,
              width: width / 3,
              resizeMode: "contain",
            }}
            source={imageSource}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            {props.agency.name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            {props.agency.category.name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            {countRequest} Yêu cầu hoàng thành
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
