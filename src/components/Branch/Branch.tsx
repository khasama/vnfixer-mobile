import { View, Text } from "react-native";
import React, { useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IBranch, RequestStatus } from "../../constants/type";

type BranchProps = {
  branch: IBranch;
};

const Branch = ({ branch }: BranchProps) => {
  const requestDone = useMemo(() => {
    return branch.requests.filter(
      (request) => request.status === RequestStatus.DONE
    );
  }, [branch]);

  const requestAccept = useMemo(() => {
    return branch.requests.filter(
      (request) => request.status === RequestStatus.ACCEPT
    );
  }, [branch]);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <View
        style={{
          marginRight: 5,
          display: "flex",
          flexDirection: "row",
          marginBottom: 3,
          alignItems: "center",
        }}
      >
        <Ionicons name="location" color={"blue"} size={15} />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            marginHorizontal: 5,
            color: "blue",
          }}
        >
          {branch.city}
        </Text>
        <Text numberOfLines={1}>{branch.address}</Text>
      </View>
      <View
        style={{
          marginRight: 5,
          display: "flex",
          flexDirection: "row",
          marginBottom: 3,
          alignItems: "center",
        }}
      >
        <Ionicons name="person-circle" color={"#616162"} size={16} />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            marginHorizontal: 5,
          }}
        >
          {branch.users.length}
        </Text>
        <Text>nhân viên</Text>
      </View>
      <View
        style={{
          marginRight: 5,
          display: "flex",
          flexDirection: "row",
          marginBottom: 3,
          alignItems: "center",
        }}
      >
        <Ionicons name="hourglass" color={"#d9a004"} size={16} />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            marginHorizontal: 5,
            color: "#d9a004",
          }}
        >
          {requestAccept.length}
        </Text>
        <Text>yêu cầu đang tiến hành</Text>
      </View>
      <View
        style={{
          marginRight: 5,
          display: "flex",
          flexDirection: "row",
          marginBottom: 3,
          alignItems: "center",
        }}
      >
        <Ionicons name="checkmark-circle-sharp" color={"green"} size={16} />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            marginHorizontal: 5,
            color: "green",
          }}
        >
          {requestDone.length}
        </Text>
        <Text>yêu cầu đã hoàn thành</Text>
      </View>
    </View>
  );
};

export default Branch;
