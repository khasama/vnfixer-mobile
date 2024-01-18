import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import ManagerStaffs from "./ManagerStaffs";
import ManagerRequests from "./ManagerRequests";
import BranchRequests from "./BranchRequests";

const ManagerStaffRoute = () => <ManagerStaffs />;

const ManagerRequetsRoute = () => <ManagerRequests />;

const BranchRequestsRoute = () => <BranchRequests />;

const Manager = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "requests",
      title: "Yêu cầu đang chờ",
      focusedIcon: "sticker-alert",
      unfocusedIcon: "sticker-alert-outline",
    },
    {
      key: "myRequests",
      title: "Yêu cầu",
      focusedIcon: "sticker-check",
      unfocusedIcon: "sticker-check-outline",
    },
    {
      key: "staffs",
      title: "Nhân viên",
      focusedIcon: "account-edit",
      unfocusedIcon: "account-edit-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    staffs: ManagerStaffRoute,
    requests: ManagerRequetsRoute,
    myRequests: BranchRequestsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Manager;

const styles = StyleSheet.create({});
