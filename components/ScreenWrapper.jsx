import { Platform } from "react-native";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text } from "react-native";
const ScreenWrapper = ({ children, customStyle }) => {
  return (
    <KeyboardAvoidingView
      style={[{ flex: 1, width: "100%" }]}
      behavior={Platform.OS == "android" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ width: "100%" }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.container]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ScreenWrapper;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 15,
    width: "100%",
    backgroundColor: "white",
  },
});
