import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native-paper";
import Message from "./Message";
import { IChatbotResponse, IMessage } from "../../constants/type";
import sendChatbot from "../../api/sendChatbot";
const { width, height } = Dimensions.get("window");

const Chatbot = () => {
  const [openChatbot, setOpenChatbot] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");
  const flatlistRef = useRef<any>();

  const handleSendChatbot = async () => {
    try {
      if (text.trim().length === 0) return;
      setMessages((messages) => [
        ...messages,
        {
          text,
          type: "me",
        },
      ]);
      flatlistRef.current.scrollToEnd({ animating: true });
      const res: IChatbotResponse = await sendChatbot(text);
      setMessages((messages) => [
        ...messages,
        {
          text: res.answer,
          type: "bot",
        },
      ]);
      flatlistRef.current.scrollToEnd({ animating: true });
      setText("");
    } catch (error) {
      ToastAndroid.show("Send message to chatbot failed", ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "100%",
          display: openChatbot ? "flex" : "none",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View style={{ width: 60 }}></View>

          <View
            style={{
              width: "100%",
              paddingTop: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderBottomWidth: 20,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: "#fff",
                transform: [{ rotate: "-90deg" }],
                marginBottom: 80,
              }}
            ></View>
            <View
              style={{
                width: width - 95,
                height: height * 0.6,
                backgroundColor: "#fff",
                marginBottom: 80,
                borderRadius: 10,
                borderBottomLeftRadius: 0,
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              <View
                style={{
                  padding: 5,
                }}
              >
                <TextInput
                  style={{ width: "100%" }}
                  mode="outlined"
                  right={
                    <TextInput.Icon icon="send" onPress={handleSendChatbot} />
                  }
                  onChangeText={setText}
                  placeholder="Nhập tin nhắn"
                  value={text}
                />
              </View>
              <View
                style={{
                  padding: 5,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    height: "100%",
                    borderRadius: 5,
                    borderColor: "#a3a0a7",
                  }}
                >
                  <FlatList
                    ref={flatlistRef}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                    data={messages}
                    renderItem={({ item }: { item: IMessage }) => (
                      <Message message={item} />
                    )}
                    keyExtractor={(item, index) => String(index)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        <TouchableOpacity
          style={{
            marginBottom: 60,
            marginLeft: 5,
          }}
          onPress={() => setOpenChatbot(!openChatbot)}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
            }}
            source={require("../../../assets/chatbot.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chatbot;

const styles = StyleSheet.create({});
