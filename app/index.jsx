import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Typo from "../components/Typo";
import Button from "../components/Button";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { useAuthContext } from "../contexts/AuthProvider";
import CustomButton from "../components/CustomButton";
export default function Index() {
  const router = useRouter();
  return (
    <>
      <ScreenWrapper>
        <View style={styles.container}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Typo size={40} weight={500}>
              VENUE
            </Typo>
            <Typo size={20} style={{ letterSpacing: 4 }}>
              MANAGER
            </Typo>
          </View>
          <View style={{ gap: 30, alignItems: "center" }}>
            <View>
              <Typo size={20} position="center">
                Manage your Venue
              </Typo>
              <Typo size={20} position="center">
                Under Fingertips!
              </Typo>
            </View>
            <View>
              <Typo color={"#5c5c5c"} position="center">
                Bookings | Appointments
              </Typo>
              <Typo color={"#5c5c5c"} position="center">
                Follow ups | Events | Price Proposals
              </Typo>
            </View>
            <CustomButton
              text={"Sign Up/Register"}
              onPress={() => router.push("register")}
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Typo size={16}>Already a member? </Typo>
              <TouchableOpacity onPress={() => router.push("login")}>
                <Typo size={16} color={"#64B7C5"}>
                  Login
                </Typo>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
