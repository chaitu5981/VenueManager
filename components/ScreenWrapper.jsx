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
    <View style={[{ flex: 1 }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.container, customStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
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
    backgroundColor: "white",
  },
});
