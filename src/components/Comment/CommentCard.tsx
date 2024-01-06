import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IComment } from "../../constants/type";
import { convertTime } from "../../utils/convertTime";

type Props = {
  comment: IComment;
};

const CommentCard = ({ comment }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        marginBottom: 15,
        backgroundColor: "#fff",
        padding: 10,
      }}
    >
      <View style={{ marginRight: 10 }}>
        <Image
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            borderRadius: 100,
          }}
          source={require("../../../assets/unknow.jpg")}
        />
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{}}>{comment.owner.email}</Text>

          <Text
            style={{
              marginLeft: "auto",
              fontSize: 12,
            }}
          >
            {convertTime(comment.createdAt)}
          </Text>
        </View>

        <View>
          <Text style={{}}>{comment.comment}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});
