import { Stack, useSegments } from "expo-router";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import AuthProvider from "../contexts/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FEB449",
  },
};

const RootLayout = () => {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <View
            style={{
              flex: 1,
            }}
          >
            <StatusBar barStyle={"dark-content"} />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="register" />
            </Stack>
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
export default RootLayout;
const styles = StyleSheet.create({});
