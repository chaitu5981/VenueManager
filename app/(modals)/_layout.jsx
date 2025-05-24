import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const ModalLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};
export default ModalLayout;
const styles = StyleSheet.create({});
