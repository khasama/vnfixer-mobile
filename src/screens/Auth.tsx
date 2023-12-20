import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigation } from "../navigators/StackNavigator";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const Auth = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigation>();
  const [isLogin, setIsLogin] = useState(true);
  const handleBackButton = useCallback(() => {
    navigation.navigate("HomeScreen");
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "flex-start",
          padding: 10,
        }}
      >
        <Button
          icon={({ size, color }) => (
            <Ionicons name="arrow-back-outline" size={size} color="#fff" />
          )}
          style={{
            alignSelf: "center",
          }}
          mode="contained"
          uppercase={false}
          onPress={handleBackButton}
        >
          Quay lại
        </Button>
      </View>
      <View>
        {isLogin && <LoginForm />}

        {!isLogin && <RegisterForm />}
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.changeScreen}>
          <TouchableOpacity
            onPress={() => setIsLogin(true)}
            style={[
              styles.touchStyle,
              styles.touchLeft,
              isLogin && styles.touchActive,
            ]}
          >
            <Ionicons name="log-in-outline" size={17} color="#fff" />
            <Text style={styles.touchText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsLogin(false)}
            style={[
              styles.touchStyle,
              styles.touchRigth,
              !isLogin && styles.touchActive,
            ]}
          >
            <Ionicons name="person-add-outline" size={17} color="#fff" />
            <Text style={styles.touchText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  changeScreen: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#fff",
  },
  touchStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#6e94e6",
  },
  touchLeft: {
    borderRightWidth: 1,
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    borderColor: "#fff",
  },
  touchRigth: {
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    borderLeftWidth: 1,
    borderColor: "#fff",
  },
  touchActive: {
    backgroundColor: "#487def",
  },
  touchText: {
    fontSize: 15,
    marginLeft: 5,
    color: "#fff",
  },
});
