import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserSelector,
  requestTakedSelector,
  requestsCanTakeSelector,
} from "../redux/selectors";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigation } from "../navigators/StackNavigator";
import { IRequest } from "../constants/type";
import { AppDispatch } from "../redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import Request from "../components/Request/Request";
import { Portal, Provider } from "react-native-paper";
import RequestInformationModal from "../components/Modals/RequestInfomationModal";
import {
  getRequestTaked,
  getRequestsCanTake,
  takeRequest,
} from "../redux/reducers/request";

const { width, height } = Dimensions.get("window");
const TakeRequest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();
  const currentUser = useSelector(currentUserSelector);
  const requests = useSelector(requestsCanTakeSelector);
  const requestTaked = useSelector(requestTakedSelector);
  const [requestSelected, setRequestSelected] = useState<IRequest | null>(null);
  const [visibleRequestInformationModal, setVisibleRequestInformationModal] =
    useState(false);
  const [modalState, setModalState] = useState<"untaked" | "taked">("untaked");
  const [refreshing, setRefreshing] = useState(false);

  const handleViewRequestTaked = (request: IRequest) => {
    setRequestSelected(request);
    setVisibleRequestInformationModal(true);
    setModalState("taked");
  };
  const handleViewRequestUntaked = (request: IRequest) => {
    setRequestSelected(request);
    setVisibleRequestInformationModal(true);
    setModalState("untaked");
  };

  const state = useMemo(() => {
    return modalState;
  }, [modalState]);

  const handleTakeRequest = (requestId: number | undefined) => {
    if (!requestId) {
      ToastAndroid.show("Không tìm thấy yêu cầu", ToastAndroid.SHORT);
      return;
    }
    dispatch(takeRequest({ requestId }))
      .then(unwrapResult)
      .catch((err: any) => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT);
      });
  };

  const handleDoneRequest = (requestId: number | undefined) => {
    console.log({ requestId });
    // setRequestSelected(request);
    // setVisibleRequestInformationModal(true);
  };

  const callApiGetRequestsCanTake = () => {
    dispatch(getRequestsCanTake())
      .then(unwrapResult)
      .catch((err: string) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  };

  const callApiGetRequestTaked = () => {
    dispatch(getRequestTaked())
      .then(unwrapResult)
      .catch((err: string) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    callApiGetRequestsCanTake();
    callApiGetRequestTaked();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    callApiGetRequestsCanTake();
    callApiGetRequestTaked();
  }, [requests, requestTaked]);

  return (
    <Provider>
      <Portal>
        <RequestInformationModal
          state={state}
          request={requestSelected}
          setVisible={setVisibleRequestInformationModal}
          visible={visibleRequestInformationModal}
          handleTakeClick={handleTakeRequest}
          handleDoneClick={handleDoneRequest}
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
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
                  textAlign: "center",
                }}
              >
                Yêu cầu đang tiến hành
              </Text>
            </View>
            <View
              style={{
                width,
                display: "flex",
                alignItems: "center",
              }}
            >
              {requestTaked ? (
                <Request
                  request={requestTaked}
                  key={requestTaked.id}
                  handleClick={handleViewRequestTaked}
                />
              ) : (
                <Text>Bạn chưa nhận yêu cầu nào</Text>
              )}
            </View>
          </View>
          <View>
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
                  textAlign: "center",
                }}
              >
                Yêu cầu bạn có thể nhận
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
                    handleClick={handleViewRequestUntaked}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};

export default TakeRequest;

const styles = StyleSheet.create({});
