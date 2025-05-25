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
import { useDispatch, useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";
import AddOrEditSubVenue from "../../components/AddOrEditSubVenue";
import AddOrEditRoom from "../../components/AddOrEditRoom";
import axios from "axios";
import { Toast } from "toastify-react-native";
import { getRoomsInfo } from "../../store/userSlice";
const ViewProfile = () => {
  const {
    user,
    venue,
    subVenues,
    rooms,
    error,
    loading: userLoading,
  } = useSelector((state) => state.user);
  const [showSubVenueModal, setShowSubVenueModal] = useState(false);
  const [editSubVenue, setEditSubVenue] = useState(false);
  const [subVenueData, setSubVenueData] = useState(null);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editRoom, setEditRoom] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingRoomId, setDeletingRoomId] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const deleteRoom = async (roomId) => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/deleteRoom?room_id=${roomId}`
      );
      if (data.status_code == 200) {
        Toast.success(data.message);
        setDeletingRoomId(null);
        await dispatch(getRoomsInfo(user.user_id));
        if (error) Toast.message(error);
      } else Toast.error(data.message);
    } catch (error) {
      Toast.error("Internal Error");
    } finally {
      setLoading(false);
    }
  };
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
            <Feather name="edit" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.card, { marginTop: 50 }]}>
          <View style={[styles.section, styles.rowSection]}>
            <View>
              <Typo size={13}>Name</Typo>
              <Typo size={17}>{user.name}</Typo>
            </View>
            <View>
              <Typo size={13}>Mobile</Typo>
              <Typo size={17}>{user.mobile_no}</Typo>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <Typo size={13}>Email Id</Typo>
            <Typo size={17}>{user.email}</Typo>
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
            <Feather name="edit" size={28} color="black" />
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
          <TouchableOpacity
            onPress={() => {
              setShowSubVenueModal(true);
              setEditSubVenue(false);
            }}
          >
            <Ionicons name="add-circle" size={40} color={colors.blue} />
          </TouchableOpacity>
        </View>
        <FlatList
          scrollEnabled={false}
          data={subVenues}
          keyExtractor={(item, i) => i}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
          renderItem={({ item }) => (
            <View style={[styles.card, styles.item]}>
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
              <TouchableOpacity
                onPress={() => {
                  setShowSubVenueModal(true);
                  setEditSubVenue(true);
                  setSubVenueData({
                    subVenueId: item.sub_venue_id,
                    name: item.sub_venue_name,
                    type: item.sub_venue_type,
                    capacity: item.sub_venue_capacity
                      ? item.sub_venue_capacity.toString()
                      : "",
                    status: item.sub_venue_status,
                  });
                }}
              >
                <MaterialIcons name="edit" size={30} color={colors.blue} />
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={styles.subHeading}>
          <Typo size={20}>Rooms Details</Typo>
          <TouchableOpacity
            onPress={() => {
              setShowRoomModal(true);
              setEditRoom(false);
            }}
          >
            <Ionicons name="add-circle" size={40} color={colors.blue} />
          </TouchableOpacity>
        </View>

        <FlatList
          scrollEnabled={false}
          data={rooms}
          keyExtractor={(item, i) => i}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
          renderItem={({ item }) => (
            <View style={[styles.card, styles.item]}>
              <View>
                <Typo size={17}>{item.room_name}</Typo>
                <Typo size={12}>
                  Type :<Typo size={12}>{item.room_type}</Typo>
                </Typo>
                <Typo size={12}>
                  Cost :<Typo size={12}>{item.room_cost}</Typo>
                </Typo>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowRoomModal(true);
                    setEditRoom(true);
                    setRoomData({
                      roomId: item.room_id,
                      number: item.room_name,
                      type: item.room_type,
                      cost: item.room_cost,
                    });
                  }}
                >
                  <MaterialIcons name="edit" size={30} color={colors.blue} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDeletingRoomId(item.room_id);
                    deleteRoom(item.room_id);
                  }}
                >
                  {(loading || userLoading) &&
                  item.room_id == deletingRoomId ? (
                    <ActivityIndicator />
                  ) : (
                    <MaterialIcons name="delete" size={30} color={"red"} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <AddOrEditSubVenue
          visible={showSubVenueModal}
          setVisible={setShowSubVenueModal}
          editing={editSubVenue}
          initialData={editSubVenue && subVenueData}
        />
        <AddOrEditRoom
          visible={showRoomModal}
          setVisible={setShowRoomModal}
          editing={editRoom}
          initialData={editRoom && roomData}
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
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
});
