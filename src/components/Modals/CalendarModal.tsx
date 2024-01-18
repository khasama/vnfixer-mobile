import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Modal } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import Ionicons from "@expo/vector-icons/Ionicons";

type CalendarModalProps = {
  visibleCalendarModal: boolean;
  setVisibleCalendarModal: (show: boolean) => void;
  changeExpectDays: (day: string) => void;
  expectDaysMark: Record<string, any>;
};

const CalendarModal = ({
  visibleCalendarModal,
  setVisibleCalendarModal,
  changeExpectDays,
  expectDaysMark,
}: CalendarModalProps) => {
  return (
    <Modal
      visible={visibleCalendarModal}
      onDismiss={() => setVisibleCalendarModal(false)}
      contentContainerStyle={{
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
      }}
    >
      <View>
        <Calendar
          onDayPress={(day) => {
            changeExpectDays(day.dateString);
          }}
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          markedDates={expectDaysMark}
        />

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Button
            icon={({ size, color }) => (
              <Ionicons name="checkmark-outline" size={size} color="#fff" />
            )}
            mode="contained"
            uppercase={false}
            onPress={() => setVisibleCalendarModal(false)}
          >
            Done
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({});
