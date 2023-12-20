import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Button, TextInput, Title } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  rePassword: Yup.string().when("password", ([password], schema) => {
    return schema.equals(password);
  }),
});

const RegisterForm = () => {
  const [showTextPass, setShowTextPass] = useState(false);
  const [showReTextPass, setShowReTextPass] = useState(false);

  const handleRegister = useCallback(
    (values: { email: string; password: string }) => {
      // dispatch(login(values))
      //   .then(unwrapResult)
      //   .then((result) => {
      //     ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
      //     navigation.navigate("ProfileScreen");
      //   })
      //   .catch((err: string) => {
      //     ToastAndroid.show(err, ToastAndroid.SHORT);
      //   });
    },
    []
  );

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rePassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <View
          style={{
            height: "80%",
            paddingHorizontal: 25,
            paddingTop: 30,
            alignItems: "center",
          }}
        >
          <Title
            style={{
              fontSize: 35,
              lineHeight: 45,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Đăng ký
          </Title>
          <TextInput
            autoCapitalize="none"
            style={{
              width: "100%",
              marginVertical: 5,
            }}
            mode="outlined"
            label={<Text style={{}}>Email</Text>}
            onChangeText={handleChange("email")}
            placeholder="Nhập Email"
            value={values.email}
          />
          <View
            style={{
              position: "relative",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              autoCapitalize="none"
              contentStyle={{
                paddingRight: 35,
              }}
              style={{
                width: "100%",
                marginVertical: 5,
              }}
              mode="outlined"
              label={<Text style={{}}>Mật Khẩu</Text>}
              secureTextEntry={!showTextPass}
              placeholder="Nhập mật khẩu"
              onChangeText={handleChange("password")}
              value={values.password}
            />
            <TouchableOpacity
              style={{
                alignSelf: "center",
                position: "absolute",
                right: 8,
                top: 22,
              }}
              onPress={() => setShowTextPass(!showTextPass)}
            >
              <Ionicons
                name={showTextPass ? "eye-outline" : "eye-off-outline"}
                size={25}
                color={"#000"}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "relative",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              autoCapitalize="none"
              contentStyle={{
                paddingRight: 35,
              }}
              style={{
                width: "100%",
                marginVertical: 5,
              }}
              mode="outlined"
              label={<Text style={{}}>Nhập lại mật Khẩu</Text>}
              secureTextEntry={!showReTextPass}
              placeholder="Nhập lại mật khẩu"
              onChangeText={handleChange("rePassword")}
              value={values.rePassword}
            />
            <TouchableOpacity
              style={{
                alignSelf: "center",
                position: "absolute",
                right: 8,
                top: 22,
              }}
              onPress={() => setShowReTextPass(!showReTextPass)}
            >
              <Ionicons
                name={showReTextPass ? "eye-outline" : "eye-off-outline"}
                size={25}
                color={"#000"}
              />
            </TouchableOpacity>
          </View>
          <Button
            buttonColor="#4894ef"
            style={{
              marginTop: 10,
            }}
            labelStyle={{}}
            mode="contained"
            uppercase={false}
            onPress={
              handleSubmit as unknown as (e: GestureResponderEvent) => void
            }
          >
            Đăng ký
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({});
