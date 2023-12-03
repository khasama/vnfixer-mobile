import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HEIGHT = Dimensions.get("window").height;

type HeaderProps = {
  allowBack: boolean;
};

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {props.allowBack && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={HEIGHT / 15 - 10}
            color="#000"
          />
        </TouchableOpacity>
      )}
      <Image source={require("../../../assets/logo.jpg")} style={styles.logo} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: HEIGHT / 15,
    padding: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  logo: {
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: "contain",
  },
});
