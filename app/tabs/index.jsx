import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import PagerView from "react-native-pager-view";
import { useEffect, useRef, useState } from "react";
import { colors, months } from "../../data/theme";
import { Calendar } from "react-native-calendars";
import Ionicons from "@expo/vector-icons/Ionicons";
import Typo from "../../components/Typo";
import { Drawer } from "react-native-drawer-layout";
import DrawerContent from "../../components/DrawerContent";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { fetchDate, fetchDate1, formatDate } from "../../utils/helper";
import AllEnquiries from "../../components/AllEnquiries";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWrapper from "../../components/ScreenWrapper";
import axios from "axios";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import Loader from "../../components/Loader";
const slots = ["Breakfast", "Lunch", "Dinner"];
const Home = () => {
  const [showCal, setShowCal] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [availability, setAvailability] = useState([]);
  const pageRef = useRef(null);
  const router = useRouter();
  const {
    user: { user_id: userId },
  } = useSelector((state) => state.user);
  const FirstRoute = () => (
    <ScreenWrapper>
      <Calendar
        current={formatDate(selectedDate)}
        onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
        markedDates={{
          [formatDate(selectedDate)]: { selected: true },
        }}
      />
      <CustomButton
        text={"Add Enquiry"}
        onPress={() => router.push("/add-enquiry")}
      />
      <Typo position={"center"}>Result of {fetchDate1(selectedDate)}</Typo>
      {loading ? (
        <Loader size={30} />
      ) : (
        <View style={styles.cards}>
          {availability.map((av, i) => (
            <View key={av.sub_venue_id} style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typo size={16} weight={700}>
                  {av.sub_venue_name}
                </Typo>
                <Typo>Capacity : {av.sub_venue_capacity}</Typo>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {slots.map((s, i) => (
                  <View
                    key={i}
                    style={[
                      styles.smallCard,
                      {
                        backgroundColor: av.event_booking_for.includes(s)
                          ? colors.lightred
                          : colors.lightgreen,
                      },
                    ]}
                  >
                    <Typo position={"center"}>{s}</Typo>
                    <View
                      style={{
                        width: 100,
                        height: 25,
                        backgroundColor: av.event_booking_for.includes(s)
                          ? colors.red
                          : colors.green,
                      }}
                    >
                      <Typo color={"white"} position={"center"} size={12}>
                        {av.event_booking_for.includes(s)
                          ? "Not Available"
                          : "Available"}
                      </Typo>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScreenWrapper>
  );
  const tabs = ["Check Availability", "All Enquiries"];
  const items = [<FirstRoute />, <AllEnquiries />];

  const TabBar = () => (
    <View style={styles.calHeader}>
      {tabs.map((tab, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => pageRef.current.setPage(i)}
          style={[
            { borderBottomWidth: 2, width: "50%", padding: 10 },
            { borderBottomColor: i == index ? colors.primary : "black" },
          ]}
        >
          <Typo
            position={"center"}
            size={14}
            weight={800}
            style={{ color: i == index ? colors.secondary : "black" }}
          >
            {tab}
          </Typo>
        </TouchableOpacity>
      ))}
    </View>
  );

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${
          process.env.EXPO_PUBLIC_BACKEND_URL
        }/v1/enquiry/checkAvailability?user_id=${userId}&date=${fetchDate(
          selectedDate
        )}`
      );
      if (data.status_code == 200) setAvailability(data.data);
      else Toast.error(data.message);
    } catch (error) {
      console.log(error);
      Toast.error("Internal Error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAvailability();
  }, [selectedDate]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Drawer
        swipeMinVelocity={2000}
        drawerStyle={styles.sidebar}
        drawerType="front"
        open={openSidebar}
        onOpen={() => setOpenSidebar(true)}
        onClose={() => setOpenSidebar(false)}
        renderDrawerContent={() => (
          <DrawerContent hideDrawer={() => setOpenSidebar(false)} />
        )}
      >
        <View style={{ flexDirection: "row", gap: 30 }}>
          <TouchableOpacity onPress={() => setOpenSidebar(true)}>
            <Ionicons name="menu" size={35} color="black" />
          </TouchableOpacity>
          {/* <Header /> */}
        </View>
        <View style={{ flex: 1 }}>
          <TabBar />
          <PagerView ref={pageRef} initialPage={0} style={{ flex: 1 }}>
            <FirstRoute key={0} />
            <AllEnquiries key={1} />
          </PagerView>
        </View>
      </Drawer>
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#ECFBFE",
  },
  button: {
    borderBottomWidth: 2,
  },
  calHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#EBFAFD",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "white",
    width: "75%",
  },
  cards: {
    backgroundColor: colors.lightgray,
    borderRadius: 15,
    gap: 15,
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
  },
  smallCard: {
    width: "32%",
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
});
