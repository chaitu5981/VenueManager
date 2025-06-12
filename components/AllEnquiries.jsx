import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap } from "react-native-tab-view";
import { useCallback, useState } from "react";
import Typo from "./Typo";
import { fetchDate, fetchDate1, formatDate } from "../utils/helper";
import { colors } from "../data/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useRouter } from "expo-router";
import CustomButton from "./CustomButton";
import { getAllEnquiries } from "../store/enquirySlice";
import { Toast } from "toastify-react-native";
import Loader from "./Loader";
const AllEnquiries = () => {
  const { enquiries, loading } = useSelector((state) => state.enquiry);
  const {
    user: { user_id: userId },
  } = useSelector((state) => state.user);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();
  const routes = [
    { key: "first", title: "All" },
    { key: "second", title: "Lead" },
    { key: "third", title: "Confirmed" },
    { key: "fourth", title: "Not-interested" },
  ];
  const fetchEnquiries = async (page, status) => {
    const res = await dispatch(
      getAllEnquiries({ userId, page, noOfRows: 10, status })
    ).unwrap();
    if (res.status_code !== 200) Toast.error(res.message);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEnquiries(1, "All");
    }, [])
  );
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
          onPress={() => {
            setIndex(i);
            fetchEnquiries(1, route.title);
          }}
          key={i}
          style={[
            {
              backgroundColor: i == index ? colors.secondary : colors.lightgray,
            },
            styles.tab,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Typo size={14} color={index == i && "white"}>
              {route.title}{" "}
            </Typo>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
  const EnquiriesList = () => {
    if (loading) return <Loader size={30} />;
    else
      return (
        <View style={{ flex: 1, marginVertical: 10 }}>
          {enquiries.length == 0 ? (
            <Typo size={20} position={"center"}>
              No Data
            </Typo>
          ) : (
            <FlatList
              data={enquiries}
              keyExtractor={(item) => item.appointment_id}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              renderItem={({ item, i }) => (
                <View style={styles.card}>
                  <Typo
                    weight={800}
                    size={16}
                    style={{ marginHorizontal: "auto" }}
                  >
                    {fetchDate1(item.created_date)}
                  </Typo>
                  <View style={styles.line} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typo weight={800}>{item.name}</Typo>
                    <Typo>
                      {" "}
                      <FontAwesome name="phone" size={15} color="black" />{" "}
                      {item.phone_no}
                    </Typo>
                  </View>
                  <View style={styles.content}>
                    <View>
                      <Typo>{item.appointment_id}</Typo>
                      <Typo size={16}>
                        <MaterialCommunityIcons
                          name="list-status"
                          size={12}
                          color="black"
                        />{" "}
                        {item.appointment_status}
                      </Typo>
                    </View>
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
                    customStyle={{
                      height: 40,
                      borderRadius: 10,
                      paddingVertical: 0,
                    }}
                    labelSize={15}
                  />
                </View>
              )}
            />
          )}
        </View>
      );
  };

  const SecondRoute = () => (
    <View>
      <Typo>Lead </Typo>
    </View>
  );
  const ThirdRoute = () => (
    <View>
      <Typo>Confirmed</Typo>
    </View>
  );
  const FourthRoute = () => {
    <View>
      <Typo>Not Interested</Typo>
    </View>;
  };
  const renderScene = SceneMap({
    first: EnquiriesList,
    second: EnquiriesList,
    third: EnquiriesList,
    fourth: EnquiriesList,
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
