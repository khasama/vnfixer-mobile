import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { IUser } from "../../constants/type";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../redux/selectors";
const { width, height } = Dimensions.get("window");
type Props = {
  staff: IUser;
  handleClick: (staff: IUser) => void;
};

const StaffCard = ({ staff, handleClick }: Props) => {
  const currentUser = useSelector(currentUserSelector);
  return (
    <View style={{ width, alignItems: "center" }}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#fff",
          width: "90%",
          marginVertical: 10,
          borderRadius: 10,
          flex: 1,
        }}
        onPress={() => handleClick(staff)}
      >
        <View
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              resizeMode: "contain",
              borderRadius: 50,
            }}
            source={require("../../../assets/unknow.jpg")}
          />
        </View>
        <View
          style={{
            padding: 10,
            flex: 1,
          }}
        >
          <Text numberOfLines={1} style={{ width: "100%" }}>
            Email: {staff.email} {currentUser.id === staff.id && "(Bạn)"}
          </Text>
          <Text numberOfLines={1} style={{ width: "100%" }}>
            Họ tên: {staff.fullName}
          </Text>
          <Text>Vai trò: {staff.agencyRole}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StaffCard;

const styles = StyleSheet.create({});
