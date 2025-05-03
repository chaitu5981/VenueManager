import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const LoginLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="otp" />
    </Stack>
  );
};
export default LoginLayout;
const styles = StyleSheet.create({});
