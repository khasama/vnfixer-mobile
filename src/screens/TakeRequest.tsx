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
import { IRequest, RequestStatus } from "../constants/type";
import { AppDispatch } from "../redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import Request from "../components/Request/Request";
import { Portal, Provider } from "react-native-paper";
import RequestInformationModal from "../components/Modals/RequestInfomationModal";
import // getRequestTaked,
// getRequestsCanTake,
// takeRequest,
"../redux/reducers/request";
import getRequestsCanTake from "../api/getRequestsCanTake";
import getRequestTaked from "../api/getRequestTaked";
import takeRequest from "../api/takeRequest";
import changeRequestStatus from "../api/changeRequestStatus";

const { width, height } = Dimensions.get("window");
const TakeRequest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();
  const currentUser = useSelector(currentUserSelector);
  const [requestSelected, setRequestSelected] = useState<IRequest | null>(null);
  const [requestTaked, setrequestTaked] = useState<IRequest | null>(null);
  const [requests, setRequests] = useState<IRequest[]>([]);
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

  const requestsCanTake = useMemo(() => {
    return requests;
  }, [requests]);

  const requestTakedCast = useMemo(() => {
    return requestTaked;
  }, [requestTaked]);

  const handleTakeRequest = async (requestId: number | undefined) => {
    if (!requestId) {
      ToastAndroid.show("Request not found", ToastAndroid.SHORT);
      return;
    }
    try {
      await takeRequest(requestId);
      await callApiGetRequestsCanTake();
      await callApiGetRequestTaked();
      ToastAndroid.show("Take request success", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Take request failed", ToastAndroid.SHORT);
    }
    setVisibleRequestInformationModal(false);
  };

  const handleDoneRequest = async (requestId: number | undefined) => {
    if (!requestId) {
      ToastAndroid.show("Request not found", ToastAndroid.SHORT);
      return;
    }
    try {
      await changeRequestStatus(requestId, RequestStatus.DONE);
      await callApiGetRequestsCanTake();
      await callApiGetRequestTaked();
      ToastAndroid.show("Done", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Failed", ToastAndroid.SHORT);
    }
    setVisibleRequestInformationModal(false);
  };

  const callApiGetRequestsCanTake = async () => {
    try {
      const res = await getRequestsCanTake();
      setRequests(res.data);
    } catch (error) {
      ToastAndroid.show("Get requests can take failed", ToastAndroid.SHORT);
    }
  };

  const callApiGetRequestTaked = async () => {
    try {
      const res = await getRequestTaked();
      setrequestTaked(res.data);
    } catch (error) {
      ToastAndroid.show("Get request taked failed", ToastAndroid.SHORT);
    }
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
  }, []);

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
              {requestTakedCast ? (
                <Request
                  request={requestTakedCast}
                  key={requestTakedCast.id}
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
              {requestsCanTake &&
                requestsCanTake.map((request) => (
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
