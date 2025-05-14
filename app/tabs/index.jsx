import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { useState } from "react";
import { colors, months } from "../../data/theme";
import { Calendar } from "react-native-calendars";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import Typo from "../../components/Typo";
import { Drawer } from "react-native-drawer-layout";
import DrawerContent from "../../components/DrawerContent";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { formatDate } from "../../utils/helper";
const Home = () => {
  const [showCal, setShowCal] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  const [index, setIndex] = useState(0);
  const router = useRouter();
  const routes = [
    { key: "first", title: "Check Availability" },
    { key: "second", title: "All Enquiries" },
  ];
  const firstRoute = () => (
    <View style={{ gap: 20, paddingHorizontal: 10 }}>
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
    </View>
  );

  const secondRoute = () => (
    <View>
      <Text>All Enquiries</Text>
    </View>
  );
  const tabBar = ({ navigationState }) => (
    <View style={styles.calHeader}>
      {navigationState.routes.map((route, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setIndex(i)}
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
            {route.title}
          </Typo>
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <View style={{ flexGrow: 1, backgroundColor: "white" }}>
      <Drawer
        swipeMinVelocity={2000}
        drawerStyle={styles.sidebar}
        drawerType="front"
        open={openSidebar}
        onOpen={() => setOpenSidebar(true)}
        onClose={() => setOpenSidebar(false)}
        renderDrawerContent={() => <DrawerContent />}
      >
        <View style={{ flexDirection: "row", gap: 30, padding: 20 }}>
          <TouchableOpacity onPress={() => setOpenSidebar(true)}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          {/* <Header /> */}
        </View>
        <View style={{ height: 470 }}>
          <TabView
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={SceneMap({ first: firstRoute, second: secondRoute })}
            initialLayout={{ width: "100%" }}
            renderTabBar={tabBar}
          />
        </View>
      </Drawer>
    </View>
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
});
