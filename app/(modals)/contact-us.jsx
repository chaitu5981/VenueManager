import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Typo from "../../components/Typo";
import { colors } from "../../data/theme";
const Card = ({ icon, label, value }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={24} color="white" />
      </View>
      <View>
        <Typo weight={900}>{label}</Typo>
        <Typo>{value}</Typo>
      </View>
    </View>
  );
};
const ContactUs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label={"Contact Us"} showBackBtn />
      <ScreenWrapper>
        <View style={{ alignItems: "center", gap: 25, paddingHorizontal: 30 }}>
          <Image
            source={require("../../assets/contact-us.png")}
            style={styles.image}
          />
          <Card
            icon={"email-outline"}
            label={"Email"}
            value={"info@venuemanager.com"}
          />
          <Card icon={"phone"} label={"Phone"} value={"9898989898"} />
        </View>
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default ContactUs;
const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    resizeMode: "cover",
  },
  card: {
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  iconContainer: {
    backgroundColor: colors.blue,
    borderRadius: 100,
    padding: 10,
  },
});
