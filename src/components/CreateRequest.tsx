import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Portal } from "react-native-paper";
import CreateRequestModal from "./Modals/CreateRequestModal";
import { IAgency } from "../constants/type";
import CalendarModal from "./Modals/CalendarModal";

type CreateRequestProps = {
  agency: IAgency | null;
  visibleCreateRequestModal: boolean;
  setVisibleCreateRequestModal: (show: boolean) => void;
};

const CreateRequest = ({
  agency,
  visibleCreateRequestModal,
  setVisibleCreateRequestModal,
}: CreateRequestProps) => {
  const [visibleCalendarModal, setVisibleCalendarModal] = useState(false);
  const [expectDays, setExpectDays] = useState<string[]>([]);

  const changeExpectDays = useCallback(
    (day: string) => {
      if (expectDays.includes(day)) {
        setExpectDays(expectDays.filter((d) => d !== day));
      } else {
        setExpectDays((expectDays) => [...expectDays, day]);
      }
    },
    [expectDays]
  );

  const expectDaysValue: string = useMemo(() => {
    return expectDays.join(", ");
  }, [expectDays]);

  const expectDaysMark = useMemo(() => {
    const markedDates: Record<string, any> = {};
    for (let i = 0; i < expectDays.length; i++) {
      markedDates[expectDays[i]] = {
        selected: true,
        selectedColor: "#00adf5",
      };
    }
    return markedDates;
  }, [expectDays]);
  return (
    <Portal>
      <CreateRequestModal
        agency={agency}
        expectDaysValue={expectDaysValue}
        setVisibleCalendarModal={setVisibleCalendarModal}
        setVisibleCreateRequestModal={setVisibleCreateRequestModal}
        visibleCreateRequestModal={visibleCreateRequestModal}
      />
      <CalendarModal
        changeExpectDays={changeExpectDays}
        expectDaysMark={expectDaysMark}
        setVisibleCalendarModal={setVisibleCalendarModal}
        visibleCalendarModal={visibleCalendarModal}
      />
    </Portal>
  );
};

export default CreateRequest;

const styles = StyleSheet.create({});
