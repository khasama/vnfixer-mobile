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
import Header from "../components/Header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getRequests from "../api/getRequests";
import { IRequest } from "../constants/type";
import { Portal, Provider } from "react-native-paper";
import RequestInformationModal from "../components/Modals/RequestInfomationModal";
import Request from "../components/Request/Request";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";

const { width, height } = Dimensions.get("window");
const BranchRequests = () => {
  const insets = useSafeAreaInsets();
  const currentUser = useSelector(currentUserSelector);
  const [requestSelected, setRequestSelected] = useState<IRequest | null>(null);
  const [requests, setRequests] = useState<IRequest[] | null>(null);
  const [visibleRequestInformationModal, setVisibleRequestInformationModal] =
    useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const requestsCast = useMemo(() => {
    return requests;
  }, [requests]);

  const callApiGetRequests = async () => {
    try {
      const res = await getRequests({
        branchId: currentUser.branchId,
        limit: 99,
      });
      setRequests(res.data.entries);
    } catch (error) {
      ToastAndroid.show("Get requests failed", ToastAndroid.SHORT);
    }
  };

  const handleViewRequestUntaked = (request: IRequest) => {
    setRequestSelected(request);
    setVisibleRequestInformationModal(true);
  };

  const handlePickRequest = async (requestId: number | undefined) => {
    // if (!requestId) {
    //   ToastAndroid.show("Request not found", ToastAndroid.SHORT);
    //   return;
    // }
    // try {
    //   await pickRequest(requestId);
    //   await callApiGetRequestsCanPick();
    //   await callApiGetRequestsAssignBranch();
    //   ToastAndroid.show("Done", ToastAndroid.SHORT);
    // } catch (error) {
    //   ToastAndroid.show("Failed", ToastAndroid.SHORT);
    // }
    // setVisibleRequestInformationModal(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    callApiGetRequests();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    callApiGetRequests();
  }, []);

  return (
    <Provider>
      <Portal>
        <RequestInformationModal
          state={"pick"}
          request={requestSelected}
          setVisible={setVisibleRequestInformationModal}
          visible={visibleRequestInformationModal}
          handlPickClick={handlePickRequest}
        />
      </Portal>
      <View
        style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#f2f2f2" }}
      >
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
                Tất cả yêu cầu ({requestsCast?.length})
              </Text>
            </View>
            <View
              style={{
                width,
                display: "flex",
                alignItems: "center",
              }}
            >
              {requestsCast &&
                requestsCast.map((request) => (
                  <Request
                    request={request}
                    key={request.id}
                    handleClick={handleViewRequestUntaked}
                  />
                ))}

              {!requestsCast ||
                (requestsCast.length === 0 && (
                  <Text>Không có yêu cầu nào</Text>
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};

export default BranchRequests;

const styles = StyleSheet.create({});
