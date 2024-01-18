import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Modal, Searchbar } from "react-native-paper";
import { debounce } from "lodash";
import { IUser } from "../../constants/type";
import searchUsersByEmail from "../../api/searchUsers";
const { width, height } = Dimensions.get("window");
type Props = {
  visible: boolean;
  setVisible: (show: boolean) => void;
};

const SearchUserToInvite = ({ visible, setVisible }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const changeSearchDebouncer = useCallback(
    debounce((query: string) => {
      if (query.trim().length >= 3) {
        callApiSearchUser(query);
      }
    }, 1500),
    []
  );
  const callApiSearchUser = async (key: string) => {
    try {
      const res = await searchUsersByEmail(key);
      setUsers(res.data);
    } catch (error) {
      ToastAndroid.show("Get staffs failed", ToastAndroid.SHORT);
    }
  };
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    changeSearchDebouncer(query);
  };
  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={{
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: 10,
        height: height * 0.7,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Searchbar
          placeholder="Search"
          iconColor="#000"
          placeholderTextColor={"gray"}
          // inputStyle={styles.text}
          style={{ backgroundColor: "#f2f2f2" }}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <View style={{ flex: 1, marginTop: 10, width: "95%" }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            data={users}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "gray",
                  padding: 10,
                  marginVertical: 2,
                }}
                onPress={() => {}}
              >
                <Text style={{}}>{item.email}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item?.id)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SearchUserToInvite;

const styles = StyleSheet.create({});
