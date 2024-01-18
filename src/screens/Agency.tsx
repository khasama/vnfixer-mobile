import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import { IAgency, IComment } from "../constants/type";
import { type StackNavigation } from "../navigators/StackNavigator";
import getAgency from "../api/getAgencyInfo";
import { Button, Provider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import Branch from "../components/Branch/Branch";
import CreateRequest from "../components/CreateRequest";
import { useNavigation } from "@react-navigation/native";
import { isLoggedInSelector } from "../redux/selectors";
import { useSelector } from "react-redux";
import getComments from "../api/getCommentsOfAgency";
import CommentForm from "../components/Comment/CommentForm";
import CommentCard from "../components/Comment/CommentCard";

type AgencyProps = {
  navigation: StackNavigation;
  route: any;
};
const { width, height } = Dimensions.get("window");
const Agnecy = (props: AgencyProps) => {
  const { id } = props.route.params;
  const isLoggedIn = useSelector(isLoggedInSelector);
  const insets = useSafeAreaInsets();
  const [agency, setAgency] = useState<IAgency | null>(null);
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [visibleCreateRequestModal, setVisibleCreateRequestModal] =
    useState(false);

  const callApiGetAgency = useCallback(
    async (id: string) => {
      const agency = await getAgency(id);
      setAgency(agency.data);
    },
    [id]
  );

  const callApiGetComments = useCallback(
    async (id: number) => {
      const res = await getComments(id);
      setComments(res.data);
    },
    [id]
  );

  const imageSource = useMemo(() => {
    if (agency && agency.logo) {
      return {
        uri: agency.logo,
      };
    }
    return require("../../assets/logo.jpg");
  }, [props]);

  const calculateRating = useMemo(() => {
    if (!agency || agency.ratings.length === 0) {
      return 0;
    }
    let total = 0;
    for (const rate of agency?.ratings) {
      total += rate.rating;
    }
    return (total / agency.ratings.length).toFixed(2);
  }, [agency]);

  useEffect(() => {
    callApiGetAgency(id);
    callApiGetComments(id);
  }, [agency]);
  return (
    <Provider>
      <CreateRequest
        agency={agency}
        setVisibleCreateRequestModal={setVisibleCreateRequestModal}
        visibleCreateRequestModal={visibleCreateRequestModal}
      />
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <View>
          <Header allowBack={true} />
        </View>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ padding: 10, width: "100%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 10,
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: width / 3,
                  height: width / 3,
                  backgroundColor: "#fff",
                  resizeMode: "contain",
                }}
                source={imageSource}
              />
              <View
                style={{
                  flex: 2,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{ color: "#616162", fontSize: 20, fontWeight: "600" }}
                >
                  {agency?.name}
                </Text>
                <Text>Dịch vụ: {agency?.category.name}</Text>
                <Text>Đánh giá: {calculateRating}</Text>
                <View
                  style={{
                    marginTop: 5,
                  }}
                >
                  <Button
                    buttonColor="#4894ef"
                    style={{
                      alignSelf: "center",
                    }}
                    mode="contained"
                    uppercase={false}
                    onPress={() => {
                      if (!isLoggedIn) {
                        props.navigation.navigate("AuthScreen");
                      } else {
                        setVisibleCreateRequestModal(true);
                      }
                    }}
                    icon={({ size, color }) => (
                      <Ionicons
                        name="hammer-outline"
                        size={size}
                        color={color}
                      />
                    )}
                  >
                    Tạo yêu cầu
                  </Button>
                </View>
              </View>
            </View>

            <View>
              <Text
                style={{ color: "#616162", fontSize: 20, fontWeight: "600" }}
              >
                Mô tả
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {agency?.description}
                </Text>
              </View>
            </View>

            <View>
              <Text
                style={{
                  color: "#616162",
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                Chi nhánh
              </Text>
              <View>
                {agency &&
                  agency.branches &&
                  agency.branches.map((branch) => (
                    <Branch branch={branch} key={branch.id} />
                  ))}
              </View>
            </View>

            {agency && (
              <View>
                <Text
                  style={{
                    color: "#616162",
                    fontSize: 20,
                    fontWeight: "600",
                    marginBottom: 10,
                  }}
                >
                  Đánh giá
                </Text>
                <View>
                  <View>
                    <CommentForm agencyId={agency?.id} />
                  </View>
                  <View>
                    {comments &&
                      comments.map((cmt) => (
                        <CommentCard comment={cmt} key={cmt.id} />
                      ))}
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};

export default Agnecy;

const styles = StyleSheet.create({});
