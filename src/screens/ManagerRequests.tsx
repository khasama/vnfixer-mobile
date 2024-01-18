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
import { IRequest, RequestStatus } from "../constants/type";
import getRequests from "../api/getRequests";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import Request from "../components/Request/Request";
import { Portal, Provider } from "react-native-paper";
import RequestInformationModal from "../components/Modals/RequestInfomationModal";
import pickRequest from "../api/pickRequest";
const { width, height } = Dimensions.get("window");
const ManagerRequests = () => {
  const insets = useSafeAreaInsets();
  const currentUser = useSelector(currentUserSelector);
  const [requestSelected, setRequestSelected] = useState<IRequest | null>(null);
  const [requestsCanPick, setRequestsCanPick] = useState<IRequest[] | null>(
    null
  );
  const [requestsAssignBranch, setRequestsAssignBranch] = useState<
    IRequest[] | null
  >(null);
  const [visibleRequestInformationModal, setVisibleRequestInformationModal] =
    useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const requestsCanPickCast = useMemo(() => {
    return requestsCanPick;
  }, [requestsCanPick]);

  const requestsAssignBranchCast = useMemo(() => {
    return requestsAssignBranch;
  }, [requestsAssignBranch]);

  const callApiGetRequestsAssignBranch = async () => {
    try {
      const res = await getRequests({
        status: RequestStatus.PENDING,
        branchId: currentUser.branchId,
        limit: 99,
      });
      setRequestsAssignBranch(res.data.entries);
    } catch (error) {
      ToastAndroid.show("Get requests pick take failed", ToastAndroid.SHORT);
    }
  };

  const callApiGetRequestsCanPick = async () => {
    try {
      const res = await getRequests({
        status: RequestStatus.PENDING,
        category: currentUser.branch?.agency?.categoryId,
        city: currentUser.branch?.city,
        limit: 99,
      });
      setRequestsCanPick(res.data.entries);
    } catch (error) {
      ToastAndroid.show("Get requests pick take failed", ToastAndroid.SHORT);
    }
  };

  const handleViewRequestUntaked = (request: IRequest) => {
    setRequestSelected(request);
    setVisibleRequestInformationModal(true);
  };

  const handlePickRequest = async (requestId: number | undefined) => {
    if (!requestId) {
      ToastAndroid.show("Request not found", ToastAndroid.SHORT);
      return;
    }
    try {
      await pickRequest(requestId);
      await callApiGetRequestsCanPick();
      await callApiGetRequestsAssignBranch();
      ToastAndroid.show("Done", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Failed", ToastAndroid.SHORT);
    }
    setVisibleRequestInformationModal(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    callApiGetRequestsCanPick();
    callApiGetRequestsAssignBranch();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    callApiGetRequestsCanPick();
    callApiGetRequestsAssignBranch();
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
          {requestsAssignBranchCast && requestsAssignBranchCast?.length > 0 && (
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
                  Yêu cầu được tạo cho chi nhánh (
                  {requestsAssignBranchCast.length})
                </Text>
              </View>
              <View
                style={{
                  width,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {requestsAssignBranchCast.map((request) => (
                  <Request
                    request={request}
                    key={request.id}
                    handleClick={handleViewRequestUntaked}
                  />
                ))}
              </View>
            </View>
          )}

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
                Yêu cầu bạn có thể lấy ({requestsCanPickCast?.length})
              </Text>
            </View>
            <View
              style={{
                width,
                display: "flex",
                alignItems: "center",
              }}
            >
              {requestsCanPickCast &&
                requestsCanPickCast.map((request) => (
                  <Request
                    request={request}
                    key={request.id}
                    handleClick={handleViewRequestUntaked}
                  />
                ))}

              {!requestsCanPickCast ||
                (requestsCanPickCast.length === 0 && (
                  <Text>Không có yêu cầu nào</Text>
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};

export default ManagerRequests;

const styles = StyleSheet.create({});
