import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import { IAgency } from "../constants/type";
import { type StackNavigation } from "../navigators/StackNavigator";
import getAgency from "../api/getAgencyInfo";

type AgencyProps = {
  navigation: StackNavigation;
  route: any;
};

const Agnecy = (props: AgencyProps) => {
  const insets = useSafeAreaInsets();
  const [agency, setAgency] = useState<IAgency | null>(null);
  const { id } = props.route.params;

  const callApiGetAgency = useCallback(
    async (id: string) => {
      const agency = await getAgency(id);
      setAgency(agency.data);
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

  useEffect(() => {
    callApiGetAgency(id);
  }, [agency]);
  return (
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
            }}
          >
            <Image
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "#fff",
                resizeMode: "contain",
              }}
              source={imageSource}
            />
            <View
              style={{
                flex: 2,
                backgroundColor: "red",
                padding: 10,
              }}
            >
              <Text>{agency?.name}</Text>
              <Text>{agency?.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Agnecy;

const styles = StyleSheet.create({});
