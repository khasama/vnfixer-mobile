import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { INotification } from "../../constants/type";
import { convertTime } from "../../utils/convertTime";

type Props = {
  notification: INotification;
  handleOpenMenu: (id: number) => void;
  menuIn: number;
};

const NotificationCard = ({ notification, handleOpenMenu, menuIn }: Props) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fff",
        width: "95%",
        marginVertical: 10,
        borderRadius: 10,
        position: "relative",
      }}
      onPress={() => {
        //
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 12,
        }}
      >
        <View
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <Text
            style={[
              {
                fontWeight: notification.read ? "normal" : "bold",
                paddingRight: 30,
                marginBottom: 3,
                fontSize: 15,
              },
            ]}
          >
            {notification.content.title}
          </Text>
          <IconButton
            style={{
              position: "absolute",
              top: -15,
              right: -15,
            }}
            icon="dots-vertical"
            iconColor="black"
            size={25}
            onPress={() => handleOpenMenu(notification.id)}
          />
        </View>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {notification.content.body}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "right",
          }}
        >
          {convertTime(notification.createdAt)}
        </Text>
      </View>
      <View
        style={{
          display: menuIn === notification.id ? "flex" : "none",
          position: "absolute",
          backgroundColor: "#fff",
          top: 40,
          right: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderRadius: 5,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 7,
          }}
        >
          <Text>Đánh dấu đã đọc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 7,
          }}
        >
          <Text>Xóa thông báo</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({});
