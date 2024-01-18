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
import { INotification } from "../constants/type";
import getMyNotification from "../api/getMyNotification";
import NotificationCard from "../components/Notification/NotificationCard";
import { currentUserSelector, isLoggedInSelector } from "../redux/selectors";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Notification = () => {
  const insets = useSafeAreaInsets();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<INotification[] | null>(
    null
  );
  const [menuIn, setMenuIn] = useState<number>(0);
  const notificationsCast = useMemo(() => {
    return notifications;
  }, [notifications]);
  const callApiGetMyNotification = useCallback(async () => {
    try {
      const res = await getMyNotification();
      setNotifications(res.data);
    } catch (error) {
      ToastAndroid.show("Get notifications failed", ToastAndroid.SHORT);
      setNotifications(null);
    }
  }, [getMyNotification]);

  const handleOpenMenu = useCallback(
    (id: number) => {
      if (menuIn !== id) {
        setMenuIn(id);
      } else {
        setMenuIn(0);
      }
    },
    [setMenuIn, menuIn]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    callApiGetMyNotification();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        callApiGetMyNotification();
      } else {
        setNotifications(null);
      }
    }, [isLoggedIn])
  );

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View>
        <Header allowBack={false} />
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: "#616162", fontSize: 18, fontWeight: "600" }}>
            Thông báo
          </Text>
        </View>
        <View
          style={{
            width,
            alignItems: "center",
          }}
        >
          {notificationsCast &&
            notificationsCast.map((noti) => (
              <NotificationCard
                key={noti.id}
                notification={noti}
                handleOpenMenu={handleOpenMenu}
                menuIn={menuIn}
              />
            ))}

          {!notificationsCast && <Text>Không có thông báo nào</Text>}
        </View>
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
