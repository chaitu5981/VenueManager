import { useState } from "react";
import { Platform } from "react-native";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
const ScreenWrapper = ({ children, customStyle, refreshApi = () => {} }) => {
  const [refresh, setRefresh] = useState(false);
  const onRefresh = async () => {
    setRefresh(true);
    await refreshApi();
    setRefresh(false);
  };
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
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.container]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
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
    paddingHorizontal: 10,
    gap: 10,
    width: "100%",
    backgroundColor: "white",
  },
});
