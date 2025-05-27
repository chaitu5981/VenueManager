import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Typo from "./Typo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../store/userSlice";
const DrawerContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSignOut = async () => {
    console.log("Hello");
    try {
      console.log("Hi");
      await AsyncStorage.removeItem("userId");
      console.log("User id removed from async storage");
      dispatch(logout());
      router.dismissAll();
      router.replace("/");
    } catch (error) {
      Alert.alert("error", error);
    }
  };
  const viewProfile = () => {
    router.push(`/(modals)/view-profile`);
  };
  const menuItems = [
    {
      icon: "home-outline",
      label: "Home",
    },
    {
      icon: "account-outline",
      label: "Profile",
      onPress: viewProfile,
    },
    {
      icon: "file-document-outline",
      label: "Invoice History",
    },
    {
      icon: "view-dashboard-outline",
      label: "Dashboard",
    },
    {
      icon: "currency-usd",
      label: "Revenue Checker",
    },
    {
      icon: "video-check-outline",
      label: "How to Use",
    },
    {
      icon: "information-outline",
      label: "About Us",
    },
    {
      icon: "file-check-outline",
      label: "Terms and Conditions",
    },
    {
      icon: "shield-check-outline",
      label: "Privacy Policy",
    },
    {
      icon: "credit-card-refund-outline",
      label: "Refund Policy",
    },
    {
      icon: "star-outline",
      label: "Rate Us",
    },
    {
      icon: "email-outline",
      label: "Contact Us",
    },
    {
      icon: "logout",
      label: "Signout",
      onPress: handleSignOut,
    },
  ];
  const { user } = useSelector((state) => state.user);
  return (
    <View style={{ flex: 1, padding: 10, gap: 20 }}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/profile.jpg")}
          style={styles.profileImg}
        />
        <View style={{ flex: 1 }}>
          <Typo>{user.name}</Typo>
          <Typo>{user.mobile_no}</Typo>
        </View>
      </View>
      <View style={styles.upgrade}>
        <MaterialCommunityIcons name="crown-outline" size={35} color="white" />
        <View>
          <Typo color={"white"} size={10}>
            YOU ARE CURRENTLY ON FREE PLAN
          </Typo>
          <Typo color={"white"}>UPGRADE NOW</Typo>
        </View>
      </View>
      <FlatList
        style={{ flex: 1 }}
        scrollEnabled
        data={menuItems}
        keyExtractor={(item) => item.label}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.onPress}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <MaterialCommunityIcons name={item.icon} size={24} color="black" />
            <Typo weight={800}>{item.label}</Typo>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default DrawerContent;
const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "lightgray",
  },
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 100,
    resizeMode: "contain",
  },
  upgrade: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#19B2C0",
    borderRadius: 10,
    padding: 10,
  },
});
