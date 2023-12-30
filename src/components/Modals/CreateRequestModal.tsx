import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { Button, Modal, TextInput } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { IAgency, IRequest, cities } from "../../constants/type";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import { categoriesSelector, currentUserSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
import createRequest from "../../api/createRequest";

type CreateRequestModalProps = {
  expectDaysValue: string;
  visibleCreateRequestModal: boolean;
  setVisibleCreateRequestModal: (show: boolean) => void;
  setVisibleCalendarModal: (show: boolean) => void;
  agency: IAgency | null;
};

const CreateRequestModal = ({
  expectDaysValue,
  visibleCreateRequestModal,
  setVisibleCreateRequestModal,
  setVisibleCalendarModal,
  agency,
}: CreateRequestModalProps) => {
  const categories = useSelector(categoriesSelector);
  const currentUser = useSelector(currentUserSelector);
  const citiesOfBraches = useMemo(() => {
    if (!agency) {
      return null;
    }
    if (!agency?.branches) {
      return [];
    }
    return agency?.branches.map((branch) => branch.city);
  }, [agency]);

  const getBranchWithCity = useCallback(
    (city: string) => {
      return agency?.branches?.find((branch) => branch.city === city);
    },
    [agency]
  );

  return (
    <Modal
      visible={visibleCreateRequestModal}
      onDismiss={() => setVisibleCreateRequestModal(false)}
      contentContainerStyle={{
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
      }}
    >
      <Formik
        initialValues={{
          title: "",
          description: "",
          city: "",
          location: "",
          categoryId: 0,
          customerPhone: currentUser?.phone || "",
          customerName: currentUser?.fullName || "",
          customerEmail: currentUser?.email || "",
        }}
        onSubmit={async (values) => {
          const request: IRequest = {
            ...values,
            expectDate: expectDaysValue.replaceAll(" ", "").split(","),
          };
          if (agency) {
            request.categoryId = agency?.category.id;
            request.branchId = getBranchWithCity(request.city)?.id;
          }
          try {
            await createRequest(request);
            //reset form
          } catch (error) {
            ToastAndroid.show("err", ToastAndroid.SHORT);
          }
        }}
      >
        {({ values, handleSubmit, handleChange, setFieldValue }) => (
          <View>
            <Text
              style={{
                color: "#000",
                textAlign: "center",
                fontSize: 20,
                marginBottom: 10,
                fontWeight: "500",
              }}
            >
              Tạo yêu cầu {agency && `cho ${agency?.name}`}
            </Text>
            <TextInput
              style={{
                width: "100%",
                marginVertical: 5,
              }}
              mode="outlined"
              label={<Text style={{}}>Tiêu đề</Text>}
              onChangeText={handleChange("title")}
              value={values.title}
            />
            <TextInput
              style={{
                width: "100%",
                marginVertical: 5,
              }}
              mode="outlined"
              label={<Text style={{}}>Mô tả</Text>}
              onChangeText={handleChange("description")}
              value={values.description}
              multiline={true}
            />

            <SelectDropdown
              data={citiesOfBraches || cities}
              defaultButtonText={"Thành phố"}
              rowTextStyle={{
                color: "#000",
                textAlign: "left",
              }}
              buttonTextStyle={{
                color: "#000",
                textAlign: "left",
              }}
              dropdownIconPosition={"right"}
              selectedRowStyle={{ backgroundColor: "#fff" }}
              buttonStyle={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 4,
                width: "100%",
                marginVertical: 5,
              }}
              onSelect={(selectedItem, index) => {
                setFieldValue("city", selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={() => {
                return (
                  <Ionicons
                    name="chevron-down-outline"
                    size={25}
                    color={"#000"}
                  />
                );
              }}
            />

            {!agency && (
              <SelectDropdown
                data={categories}
                defaultButtonText={"Dịch vụ"}
                rowTextStyle={{
                  color: "#000",
                  textAlign: "left",
                }}
                buttonTextStyle={{
                  color: "#000",
                  textAlign: "left",
                }}
                dropdownIconPosition={"right"}
                selectedRowStyle={{ backgroundColor: "#fff" }}
                buttonStyle={{
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 4,
                  width: "100%",
                  marginVertical: 5,
                }}
                onSelect={(selectedItem, index) => {
                  setFieldValue("categoryId", selectedItem.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
                renderDropdownIcon={() => {
                  return (
                    <Ionicons
                      name="chevron-down-outline"
                      size={25}
                      color={"#000"}
                    />
                  );
                }}
              />
            )}

            <TextInput
              style={{
                width: "100%",
                marginVertical: 5,
              }}
              mode="outlined"
              label={<Text style={{}}>Địa chỉ</Text>}
              onChangeText={handleChange("location")}
              value={values.location}
            />
            <TextInput
              style={{
                width: "100%",
                marginVertical: 5,
              }}
              mode="outlined"
              label={<Text style={{}}>Họ tên</Text>}
              onChangeText={handleChange("customerName")}
              value={values.customerName}
            />
            <TextInput
              style={{
                width: "100%",
                marginVertical: 5,
              }}
              mode="outlined"
              label={<Text style={{}}>Email</Text>}
              onChangeText={handleChange("customerEmail")}
              value={values.customerEmail}
            />
            <TextInput
              style={{
                width: "100%",
                marginVertical: 5,
              }}
              mode="outlined"
              label={<Text style={{}}>Số điện thoại</Text>}
              onChangeText={handleChange("customerPhone")}
              value={values.customerPhone}
            />
            <TextInput
              style={{
                width: "100%",
                marginVertical: 5,
              }}
              mode="outlined"
              label={<Text style={{}}>Ngày mong muốn</Text>}
              editable={false}
              right={
                <TextInput.Icon
                  onPress={() => setVisibleCalendarModal(true)}
                  icon="calendar"
                />
              }
              value={expectDaysValue}
              multiline={true}
            />

            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Button
                icon={({ size, color }) => (
                  <Ionicons name="build-outline" size={size} color="#fff" />
                )}
                mode="contained"
                uppercase={false}
                style={{
                  backgroundColor: "#e3a432",
                }}
                onPress={
                  handleSubmit as unknown as (e: GestureResponderEvent) => void
                }
              >
                Gửi yêu cầu
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateRequestModal;

const styles = StyleSheet.create({});
