import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import { colors } from "../../data/theme";
import Typo from "../../components/Typo";
import { useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";
import AddOrEditSubVenue from "../../components/AddOrEditSubVenue";
const ViewProfile = () => {
  const { user, venue, subVenues } = useSelector((state) => state.user);
  const [showSubVenueModal, setShowSubVenueModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label="Profile" showBackBtn />
      <ScreenWrapper>
        <View style={styles.subHeading}>
          <Typo size={20}>Personal Details</Typo>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/register",
                params: {
                  editing: true,
                },
              })
            }
          >
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.card, { marginTop: 50 }]}>
          <View style={[styles.section, styles.rowSection]}>
            <View>
              <Typo>Name</Typo>
              <Typo>{user.name}</Typo>
            </View>
            <View>
              <Typo>Mobile</Typo>
              <Typo>{user.mobile_no}</Typo>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <Typo>Email Id</Typo>
            <Typo>{user.email}</Typo>
          </View>
          <Image
            source={require("../../assets/user.png")}
            style={styles.userImg}
          />
        </View>
        <View style={styles.subHeading}>
          <Typo size={20}>Venue Details</Typo>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/register/step2",
                params: {
                  editing: true,
                },
              })
            }
          >
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={styles.section}>
            <Typo size={13}>Venue Name</Typo>
            <Typo size={17}>{venue.venue_name}</Typo>
          </View>
          <View style={[styles.section, styles.rowSection]}>
            <View>
              <Typo size={13}>Venue Type</Typo>
              <Typo size={17}>{venue.venue_type}</Typo>
            </View>
            <View>
              <Typo size={13}>City</Typo>
              <Typo size={17}>{venue.city}</Typo>
            </View>
          </View>
          <View style={styles.section}>
            <Typo size={13}>Address</Typo>
            <Typo size={17}>{venue.address}</Typo>
          </View>
          <View style={{ padding: 20 }}>
            <Typo size={13}>Pin Code</Typo>
            <Typo size={17}>{venue.pincode}</Typo>
          </View>
        </View>
        <View style={styles.subHeading}>
          <Typo size={20}>Sub Venue Details</Typo>
          <TouchableOpacity onPress={() => setShowSubVenueModal(true)}>
            <Ionicons name="add-circle" size={35} color={colors.blue} />
          </TouchableOpacity>
        </View>
        <FlatList
          scrollEnabled={false}
          data={subVenues}
          keyExtractor={(item, i) => i}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
          renderItem={({ item }) => (
            <View style={[styles.card, styles.subVenue]}>
              <View>
                <Typo size={17}>{item.sub_venue_name}</Typo>
                <Typo size={12}>
                  Status :
                  <Typo
                    size={12}
                    color={item.sub_venue_status == "Active" ? "green" : "red"}
                  >
                    {item.sub_venue_status}
                  </Typo>
                </Typo>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={30} color={colors.blue} />
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={styles.subHeading}>
          <Typo size={20}>Rooms Details</Typo>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={35} color={colors.blue} />
          </TouchableOpacity>
        </View>
        <AddOrEditSubVenue
          visible={showSubVenueModal}
          setVisible={setShowSubVenueModal}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default ViewProfile;
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightgray,
    borderRadius: 10,
  },
  userImg: {
    position: "absolute",
    left: "50%",
    top: -50,
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: "contain",
    transform: [{ translateX: "-50%" }],
    borderWidth: 2,
  },
  section: {
    padding: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 2,
  },
  rowSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subVenue: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
});
