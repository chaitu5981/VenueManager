import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
const AboutUs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label={"About Us"} showBackBtn />
      <ScreenWrapper>
        <View>
          <Typo>
            Venue management offers a comprehensive application tailored for
            sales executives in the hospitality industry. Our platform enables
            sales professionals to efficiently manage venue details, customer
            bookings, follow-ups, and subscription services. Seamlessly
            integrated with user-friendly features and advanced functionalities,
            Venue Management empowers sales teams to streamline their operations
            and enhance customer service.
          </Typo>
        </View>
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default AboutUs;
const styles = StyleSheet.create({});
