import { Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { currentUserSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { IMessage } from "../../constants/type";

type Props = {
  message: IMessage;
};

const Message = ({ message }: Props) => {
  const currentUser = useSelector(currentUserSelector);
  const imageSource = useMemo(() => {
    if (message.type === "me") {
      if (currentUser && currentUser.imageUrl) {
        return {
          uri: currentUser.imageUrl,
        };
      }
      return require("../../../assets/unknow.jpg");
    }
    return require("../../../assets/chatbot.png");
  }, [message]);
  return (
    <View
      style={[
        {
          padding: 5,
          marginVertical: 2,
          flexWrap: "wrap",
          flexDirection: message.type === "me" ? "row-reverse" : "row",
        },
      ]}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={imageSource}
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain",
            borderRadius: 100,
          }}
        />
      </View>
      <View style={{ flex: 6, paddingHorizontal: 5 }}>
        <Text
          style={[
            {
              color: "#000",
              fontSize: 13,
              fontWeight: "bold",
            },
            message.type === "me" ? { textAlign: "right" } : {},
          ]}
        >
          {message.type === "me" ? "Bạn" : "Bot"}
        </Text>
        <Text
          style={[
            {
              backgroundColor: "#f2f2f2",
              fontSize: 15,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 5,
            },
          ]}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
