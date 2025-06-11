import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap } from "react-native-tab-view";
import { useState } from "react";
import Typo from "./Typo";
import { fetchDate, fetchDate1, formatDate } from "../utils/helper";
import { colors } from "../data/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import CustomButton from "./CustomButton";
import { Toast } from "toastify-react-native";
const AllEnquiries = () => {
  const { enquiries, loading } = useSelector((state) => state.enquiry);
  const [index, setIndex] = useState(0);
  // const [currId, setCurrId] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  // console.log(enquiries[0]);
  const routes = [
    { key: "first", title: "Enquiries" },
    { key: "second", title: "Interested" },
    { key: "third", title: "Not Interested" },
  ];
  const getTotal = (i) => {
    switch (i) {
      case 0:
        return enquiries.length;
      case 1:
        return 0;
      case 2:
        return 0;
    }
  };

  const TabBar = ({ navigationState }) => (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 2,
        gap: 5,
      }}
    >
      {navigationState.routes.map((route, i) => (
        <TouchableOpacity
          onPress={() => setIndex(i)}
          key={i}
          style={[
            {
              backgroundColor: i == index ? colors.secondary : colors.lightgray,
            },
            styles.tab,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Typo size={12} color={index == i && "white"}>
              {route.title}{" "}
            </Typo>
            <View
              style={[
                styles.badge,
                { backgroundColor: index == i ? "white" : colors.secondary },
              ]}
            >
              <Typo size={12} color={index == i ? colors.secondary : "white"}>
                {getTotal(i)}
              </Typo>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
  const FirstRoute = () => (
    <View style={{ flex: 1, marginVertical: 10 }}>
      <FlatList
        data={enquiries}
        keyExtractor={(item) => item.appointment_id}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        renderItem={({ item, i }) => (
          <View style={styles.card}>
            <Typo weight={800} size={16} style={{ marginHorizontal: "auto" }}>
              {fetchDate1(item.created_date)}
            </Typo>
            <View style={styles.line} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typo weight={800}>{item.name}</Typo>
              <Typo>
                {" "}
                <FontAwesome name="phone" size={15} color="black" />{" "}
                {item.phone_no}
              </Typo>
            </View>
            <View style={styles.content}>
              <Typo>
                <MaterialCommunityIcons
                  name="list-status"
                  size={12}
                  color="black"
                />{" "}
                {item.appointment_status}
              </Typo>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "flex-start",
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={18}
                  color="black"
                />
                <View>
                  {item.appointment_date.map((d, i) => (
                    <Typo key={i}>{fetchDate(d)}</Typo>
                  ))}
                </View>
              </View>
            </View>
            <CustomButton
              text={"View Details"}
              onPress={() => {
                router.push({
                  pathname: "/enquiry-details",
                  params: {
                    enquiryId: item.appointment_id,
                  },
                });
              }}
              customStyle={{ height: 40, borderRadius: 10, paddingVertical: 0 }}
              labelSize={15}
            />
          </View>
        )}
      />
    </View>
  );

  const SecondRoute = () => (
    <View>
      <Typo>Interested </Typo>
    </View>
  );
  const ThirdRoute = () => (
    <View>
      <Typo>Not Interested</Typo>
    </View>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  return (
    <View style={{ flex: 1, gap: 20, paddingHorizontal: 15 }}>
      <Typo size={20} weight={800}>
        All Enquiries
      </Typo>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        swipeEnabled={false}
        renderScene={renderScene}
        initialLayout={{ width: "100%" }}
        renderTabBar={TabBar}
      />
    </View>
  );
};

export default AllEnquiries;
const styles = StyleSheet.create({
  tab: {
    borderRadius: 10,
    padding: 10,
    width: "31%",
  },
  badge: {
    width: 25,
    height: 25,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: colors.lightgray,
    borderRadius: 20,
    padding: 10,
    gap: 10,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.gray,
  },
  content: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
