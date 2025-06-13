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
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../store/userSlice";
import { useState, memo } from "react";
const DrawerContent = ({ hideDrawer }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      router.dismissAll();
      router.replace("/");
      setTimeout(() => dispatch(logout()), 50);
    } catch (error) {
      Alert.alert("error", error);
    }
  };

  const menuItems = [
    {
      icon: "home-outline",
      label: "Home",
      onPress: () => {},
    },
    {
      icon: "account-outline",
      label: "Profile",
      onPress: () => router.push(`/(modals)/view-profile`),
    },
    {
      icon: "account-multiple-plus-outline",
      label: "Add Team",
      onPress: () => {},
    },
    {
      icon: "file-document-outline",
      label: "Invoice History",
      onPress: () => {},
    },
    {
      icon: "view-dashboard-outline",
      label: "Dashboard",
      onPress: () => {},
    },

    {
      icon: "video-check-outline",
      label: "How to Use",
      onPress: () => router.push(`/(modals)/how-to-use`),
    },
    {
      icon: "logout",
      label: "Signout",
      onPress: handleSignOut,
    },
    {
      icon: "settings",
      label: "Settings",
      isSubMenu: true,
      onPress: () => setShowSubMenu(!showSubMenu),
      subMenu: [
        {
          icon: "information-outline",
          label: "About Us",
          onPress: () => router.push(`/(modals)/about-us`),
        },
        {
          icon: "file-check-outline",
          label: "Terms and Conditions",
          onPress: () => router.push(`/(modals)/terms-conditions`),
        },
        {
          icon: "shield-check-outline",
          label: "Privacy Policy",
          onPress: () => {},
        },
        {
          icon: "credit-card-refund-outline",
          label: "Refund Policy",
          onPress: () => {},
        },
        {
          icon: "email-outline",
          label: "Contact Us",
          onPress: () => router.push("/(modals)/contact-us"),
        },
      ],
    },
    {
      icon: "star-outline",
      label: "Rate Us",
      onPress: () => router.push("/(modals)/rate-us"),
    },
  ];
  const { user } = useSelector((state) => state.user);
  return (
    <View style={{ flex: 1, gap: 20, paddingHorizontal: 10 }}>
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
      <ScrollView contentContainerStyle={{ gap: 20 }} nestedScrollEnabled>
        {menuItems.map((item) => (
          <View key={item.label}>
            <TouchableOpacity
              onPress={() => {
                item.onPress();
                item.isSubMenu || hideDrawer();
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                {item?.isSubMenu ? (
                  <Feather name={item.icon} size={24} color="black" />
                ) : (
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color="black"
                  />
                )}

                <Typo weight={800}>{item.label}</Typo>
              </View>
              {item.subMenu && (
                <MaterialCommunityIcons
                  name={showSubMenu ? "chevron-up" : "chevron-down"}
                  size={30}
                  color="black"
                />
              )}
            </TouchableOpacity>
            {showSubMenu && item.isSubMenu && (
              <ScrollView
                contentContainerStyle={styles.subMenu}
                nestedScrollEnabled
              >
                {item.subMenu.map((item) => (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => {
                      item.onPress();
                      hideDrawer();
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={24}
                      color="black"
                    />
                    <Typo weight={800}>{item.label}</Typo>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default DrawerContent;
const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 10,
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
  subMenu: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
});
