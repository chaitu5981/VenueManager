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
import { colors } from "../../data/theme";
import { months } from "../../data/constants";
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
import { Picker } from "@react-native-picker/picker";

const slots = ["Breakfast", "Lunch", "Dinner"];
const Home = () => {
  const [showCal, setShowCal] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDate, setMarkedDate] = useState({
    [formatDate(new Date())]: { selected: true },
  });
  const [viewDate, setViewDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [availability, setAvailability] = useState([]);
  const pageRef = useRef(null);
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const userId = user?.user_id;
  const now = new Date();
  const years = Array(10)
    .fill(null)
    .map((_, i) => now.getFullYear() - 4 + i);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [currentDate, setCurrentDate] = useState("");
  const [signoutState, setSignoutState] = useState(false);
  useEffect(() => {
    setCurrentDate(
      `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-01`
    );
  }, [selectedMonth, selectedYear]);
  const FirstRoute = () => (
    <ScreenWrapper>
      <Calendar
        current={currentDate}
        key={selectedDate}
        onMonthChange={(day) => {
          setSelectedMonth(day.month - 1);
          setSelectedYear(day.year);
        }}
        onDayPress={(day) => {
          setSelectedDate(new Date(day.dateString));
          setMarkedDate({ [day.dateString]: { selected: true } });
        }}
        markedDates={markedDate}
        renderHeader={() => (
          <View
            style={{
              height: 60,
              width: "80%",
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 0,
            }}
          >
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(v) => setSelectedMonth(v)}
              style={{ color: "black", height: "100%", width: "50%" }}
              dropdownIconColor={"black"}
            >
              {months.map((m) => (
                <Picker.Item label={m.label} value={m.value} key={m.value} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(v) => setSelectedYear(v)}
              style={{ color: "black", height: "100%", width: "50%" }}
              dropdownIconColor={"black"}
            >
              {years.map((y) => (
                <Picker.Item key={y} label={y} value={y}></Picker.Item>
              ))}
            </Picker>
          </View>
        )}
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
  if (signoutState) return <></>;
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
          <DrawerContent
            hideDrawer={() => setOpenSidebar(false)}
            setSignoutState={setSignoutState}
          />
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
