import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { IRequest, RequestStatus } from "../../constants/type";

type Props = {
  request: IRequest;
  handleClick: (request: IRequest) => void;
};

const Request = ({ request, handleClick }: Props) => {
  const statusColor = useMemo(() => {
    switch (request.status) {
      case RequestStatus.PENDING:
        return "#d9a004";
      case RequestStatus.ACCEPT:
        return "#23abfd";
      case RequestStatus.CANCEL:
        return "red";
      case RequestStatus.DONE:
        return "green";
      default:
        return "#000";
    }
  }, [request]);

  return (
    <View>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#fff",
          width: "90%",
          marginVertical: 10,
          borderRadius: 10,
        }}
        onPress={() => handleClick(request)}
      >
        <View
          style={{
            flex: 5,
            padding: 10,
          }}
        >
          <Text>Tiêu đề: {request.title}</Text>
          <Text>Dịch vụ: {request.category?.name}</Text>
          <Text>Đại lý: {request.branch?.agency?.name || "Chưa có"}</Text>
        </View>
        <View
          style={{
            flex: 2,
            padding: 10,
          }}
        >
          <View
            style={{
              borderLeftWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              borderLeftColor: statusColor,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 17,
                color: statusColor,
              }}
            >
              {request.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({});
