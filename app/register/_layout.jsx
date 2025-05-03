import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createContext, useContext, useState } from "react";
import { Stack, useRouter } from "expo-router";
const RegisterLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="otp" />
      </Stack>
    </>
  );
};

export default RegisterLayout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
