import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Button, TextInput, Title } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/reducers/auth";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";
import { type StackNavigation } from "../../navigators/StackNavigator";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = () => {
  const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch<AppDispatch>();
  const [showTextPass, setShowTextPass] = useState(false);
  const handleLogin = useCallback(
    (values: { email: string; password: string }) => {
      dispatch(login(values))
        .then(unwrapResult)
        .then((result) => {
          ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
          navigation.goBack();
        })
        .catch((err: string) => {
          ToastAndroid.show(err, ToastAndroid.SHORT);
        });
    },
    []
  );
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
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
            Đăng nhập
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
            error={!!errors.email}
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
              error={!!errors.password}
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
            Đăng nhập
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
