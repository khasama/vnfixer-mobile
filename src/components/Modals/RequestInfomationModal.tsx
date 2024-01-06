import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Modal, TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IRequest } from "../../constants/type";

type RequestInformationModalProps = {
  request: IRequest | null;
  visible: boolean;
  setVisible: (show: boolean) => void;
  handlPickClick?: (requestId: number | undefined) => void;
  handleCancelClick?: (requestId: number | undefined) => void;
  handleTakeClick?: (requestId: number | undefined) => void;
  handleDoneClick?: (requestId: number | undefined) => void;
  state: "taked" | "untaked" | "pick";
};

const RequestInformationModal = ({
  request,
  visible,
  setVisible,
  handlPickClick,
  handleCancelClick,
  handleTakeClick,
  handleDoneClick,
  state,
}: RequestInformationModalProps) => {
  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={{
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
      }}
    >
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
          Yêu cầu cho {state}
        </Text>
        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Tiêu đề</Text>}
          value={request?.title}
          editable={false}
        />
        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Mô tả</Text>}
          value={request?.description}
          multiline={true}
          editable={false}
        />

        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Thành phố</Text>}
          value={request?.branch?.city}
          editable={false}
        />

        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Dịch vụ</Text>}
          value={request?.category?.name}
          editable={false}
        />

        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Địa chỉ</Text>}
          value={request?.location}
          editable={false}
        />
        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Họ tên</Text>}
          value={request?.customerName}
          editable={false}
        />
        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Email</Text>}
          value={request?.customerEmail}
          editable={false}
        />
        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Số điện thoại</Text>}
          value={request?.customerPhone}
          editable={false}
        />
        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Ngày mong muốn</Text>}
          editable={false}
          value={!Array.isArray(request?.expectDate) ? request?.expectDate : ""}
          multiline={true}
        />

        <View style={{ alignItems: "center", marginTop: 10 }}>
          {handleCancelClick && (
            <Button
              icon={({ size, color }) => (
                <Ionicons name="build-outline" size={size} color="#fff" />
              )}
              mode="contained"
              uppercase={false}
              style={{
                backgroundColor: "red",
              }}
              onPress={() => handleCancelClick(request?.id)}
            >
              Hủy yêu cầu
            </Button>
          )}
          {handleTakeClick && state === "untaked" && (
            <Button
              icon={({ size, color }) => (
                <Ionicons name="build-outline" size={size} color="#fff" />
              )}
              mode="contained"
              uppercase={false}
              style={{
                backgroundColor: "#23abfd",
              }}
              onPress={() => handleTakeClick(request?.id)}
            >
              Nhận yêu cầu
            </Button>
          )}
          {handleDoneClick && state === "taked" && (
            <Button
              icon={({ size, color }) => (
                <Ionicons name="build-outline" size={size} color="#fff" />
              )}
              mode="contained"
              uppercase={false}
              style={{
                backgroundColor: "green",
              }}
              onPress={() => handleDoneClick(request?.id)}
            >
              Hoàn thành
            </Button>
          )}
          {handlPickClick && state === "pick" && (
            <Button
              icon={({ size, color }) => (
                <Ionicons name="build-outline" size={size} color="#fff" />
              )}
              mode="contained"
              uppercase={false}
              style={{
                backgroundColor: "green",
              }}
              onPress={() => handlPickClick(request?.id)}
            >
              Lấy
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default RequestInformationModal;

const styles = StyleSheet.create({});
