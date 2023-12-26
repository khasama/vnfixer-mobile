import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserSelector,
  isLoggedInSelector,
  myRequestsSelector,
} from "../redux/selectors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type StackNavigation } from "../navigators/StackNavigator";
import { AgencyRoleType, IRequest } from "../constants/type";
import { getMyRequests, logout } from "../redux/reducers/auth";
import { AppDispatch } from "../redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import Request from "../components/Request/Request";
import { Portal, Provider } from "react-native-paper";
import RequestInformationModal from "../components/Modals/RequestInfomationModal";

const { width, height } = Dimensions.get("window");
const MyRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();
  const currentUser = useSelector(currentUserSelector);
  const requests = useSelector(myRequestsSelector);
  const [requestSelected, setRequestSelected] = useState<IRequest | null>(null);
  const [visibleRequestInformationModal, setVisibleRequestInformationModal] =
    useState(false);

  const handleViewRequest = (request: IRequest) => {
    setRequestSelected(request);
    setVisibleRequestInformationModal(true);
  };

  useEffect(() => {
    dispatch(getMyRequests())
      .then(unwrapResult)
      .catch((err: string) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  }, []);

  return (
    <Provider>
      <Portal>
        <RequestInformationModal
          request={requestSelected}
          setVisible={setVisibleRequestInformationModal}
          visible={visibleRequestInformationModal}
        />
      </Portal>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <Header allowBack={true} />
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 18,
                marginLeft: 10,
                color: "#3d3d3d",
              }}
            >
              Yêu cầu của bạn
            </Text>
          </View>
          <View
            style={{
              width,
              display: "flex",
              alignItems: "center",
            }}
          >
            {requests &&
              requests.map((request) => (
                <Request
                  request={request}
                  key={request.id}
                  handleClick={handleViewRequest}
                />
              ))}
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};

export default MyRequests;

const styles = StyleSheet.create({});
