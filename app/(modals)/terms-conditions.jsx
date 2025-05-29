import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
const conditions = [
  {
    label: "Acceptance of Terms",
    text: "By using this service/website/app, you agree to follow and be bound by these terms and conditions.",
  },
  {
    label: "Use of Service",
    text: "You agree to use the service only for lawful purposes and in a way that does not harm, disable, or impair it.",
  },
  {
    label: "User Accounts",
    text: "You are responsible for maintaining the confidentiality of your account and password. Any activity under your account is your responsibility.",
  },
  {
    label: "Intellectual Property",
    text: "All content, design, logos, and materials are the property of the company and protected by copyright and trademark laws.",
  },
  {
    label: "Privacy Policy",
    text: "Your personal information will be handled according to our Privacy Policy. By using the service, you consent to our data practices.",
  },
  {
    label: "Prohibited Activities",
    text: "Users must not upload harmful content, attempt to hack or misuse the system, or engage in illegal activities.",
  },
  {
    label: "Termination of Access",
    text: "We reserve the right to terminate or suspend your access if you violate these terms.",
  },
  {
    label: "Limitation of Liability",
    text: "We are not responsible for any indirect or incidental damages that may occur from using the service.",
  },
  {
    label: "Changes to Terms",
    text: "We may update these terms at any time. Continued use of the service means you accept the changes.",
  },
  {
    label: " Governing Law",
    text: "These terms are governed by the laws of [Your Country/State], and any disputes will be handled in its courts.",
  },
];
const TermsAndConditions = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label="Terms & Conditions" showBackBtn />
      <ScreenWrapper>
        <FlatList
          data={conditions}
          scrollEnabled={false}
          keyExtractor={(item) => item.label}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item, index }) => (
            <View>
              <Typo size={16} weight={800}>
                {index + 1}. {item.label}
              </Typo>
              <Typo weight={500} style={{ marginLeft: 20 }}>
                {item.text}
              </Typo>
            </View>
          )}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default TermsAndConditions;
const styles = StyleSheet.create({});
