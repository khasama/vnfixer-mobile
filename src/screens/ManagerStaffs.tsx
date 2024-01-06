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
import { IUser } from "../constants/type";
import getStaffs from "../api/getStaffs";
import StaffCard from "../components/Staff/StaffCard";
import { FAB, Portal, Provider } from "react-native-paper";
import StaffInformationModal from "../components/Modals/StaffInfomationModal";
import SearchUserToInvite from "../components/Modals/SearchUserToInvite";
const { width, height } = Dimensions.get("window");
const ManagerStaffs = () => {
  const insets = useSafeAreaInsets();
  const [staffs, setstaffs] = useState<IUser[] | null>(null);
  const [staffSelected, setStaffSelected] = useState<IUser | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleStaffInformationModal, setVisibleStaffInformationModal] =
    useState(false);
  const [visibleSearchModal, setVisibleSearchModal] = useState(false);

  const staffsCast = useMemo(() => {
    return staffs;
  }, [staffs]);

  const callApiGetStaffs = async () => {
    try {
      const res = await getStaffs();
      setstaffs(res.data);
    } catch (error) {
      ToastAndroid.show("Get staffs failed", ToastAndroid.SHORT);
    }
  };

  const handleKickRequest = async (staffId: number | undefined) => {
    if (!staffId) {
      ToastAndroid.show("Request not found", ToastAndroid.SHORT);
      return;
    }
    try {
      // await pickRequest(requestId);
      ToastAndroid.show("Done", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Failed", ToastAndroid.SHORT);
    }
    await callApiGetStaffs();
    setVisibleStaffInformationModal(false);
  };

  const handleViewStaffInfo = (staff: IUser) => {
    setStaffSelected(staff);
    setVisibleStaffInformationModal(true);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    callApiGetStaffs();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    callApiGetStaffs();
  }, []);

  return (
    <Provider>
      <Portal>
        <SearchUserToInvite
          setVisible={setVisibleSearchModal}
          visible={visibleSearchModal}
        />
        <StaffInformationModal
          staff={staffSelected}
          setVisible={setVisibleStaffInformationModal}
          visible={visibleStaffInformationModal}
          handleKickClick={handleKickRequest}
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
                Tất cả nhân viên
              </Text>
            </View>
            <View
              style={{
                width,
                display: "flex",
                alignItems: "center",
              }}
            >
              {staffsCast &&
                staffsCast.map((staff) => (
                  <StaffCard
                    staff={staff}
                    key={staff.id}
                    handleClick={handleViewStaffInfo}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <FAB
        icon={"plus"}
        onPress={() => setVisibleSearchModal(true)}
        style={[styles.fabStyle, styles.fabStyle]}
      />
    </Provider>
  );
};

export default ManagerStaffs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
