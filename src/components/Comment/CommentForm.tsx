import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";

type Props = {
  agencyId: number;
};

const CommentForm = ({ agencyId }: Props) => {
  const handleSendComment = useCallback((values: {}) => {
    // dispatch(login(values))
    //   .then(unwrapResult)
    //   .then((result) => {
    //     ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
    //     navigation.navigate("ProfileScreen");
    //   })
    //   .catch((err: string) => {
    //     ToastAndroid.show(err, ToastAndroid.SHORT);
    //   });
  }, []);
  return (
    <View>
      <Formik
        initialValues={{
          comment: "",
        }}
        onSubmit={handleSendComment}
      >
        {({ values, handleSubmit, handleChange, errors }) => (
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={{ width: "100%", marginBottom: 10 }}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="send"
                  onPress={
                    handleSubmit as unknown as (
                      e: GestureResponderEvent
                    ) => void
                  }
                />
              }
              onChangeText={handleChange("comment")}
              placeholder="Nhập bình luận"
              value={values.comment}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CommentForm;

const styles = StyleSheet.create({});
