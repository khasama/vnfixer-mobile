import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Modal, TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AgencyRoleType, IUser } from "../../constants/type";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../redux/selectors";

type StaffInformationModalProps = {
  staff: IUser | null;
  visible: boolean;
  setVisible: (show: boolean) => void;
  handleKickClick?: (userId: number | undefined) => void;
};

const StaffInformationModal = ({
  staff,
  visible,
  setVisible,
  handleKickClick,
}: StaffInformationModalProps) => {
  const currentUser = useSelector(currentUserSelector);
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
          Thông tin nhân viên
        </Text>
        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Email</Text>}
          value={staff?.email}
          editable={false}
        />
        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Họ tên</Text>}
          value={staff?.fullName}
          multiline={true}
          editable={false}
        />

        <TextInput
          style={{
            width: "100%",
            marginVertical: 5,
          }}
          mode="outlined"
          label={<Text style={{}}>Số điện thoại</Text>}
          value={staff?.phone}
          editable={false}
        />

        <View style={{ alignItems: "center", marginTop: 10 }}>
          {currentUser.id !== staff?.id &&
            currentUser.agencyRole === AgencyRoleType.MANAGER &&
            handleKickClick && (
              <Button
                icon={({ size, color }) => (
                  <Ionicons name="build-outline" size={size} color="#fff" />
                )}
                mode="contained"
                uppercase={false}
                style={{
                  backgroundColor: "red",
                }}
                onPress={() => handleKickClick(staff?.id)}
              >
                Xóa
              </Button>
            )}
        </View>
      </View>
    </Modal>
  );
};

export default StaffInformationModal;

const styles = StyleSheet.create({});
