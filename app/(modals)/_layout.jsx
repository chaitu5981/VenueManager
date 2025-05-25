import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const ModalLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    />
  );
};
export default ModalLayout;
const styles = StyleSheet.create({});
