import { Stack, useSegments } from "expo-router";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import AuthProvider from "../contexts/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "../store";
import ToastManager from "toastify-react-native";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FEB449",
  },
};

const RootLayout = () => {
  return (
    <Provider store={store}>
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
                <Stack.Screen name="index1" />
                <Stack.Screen name="register" />
                <Stack.Screen name="otp" />
              </Stack>
            </View>
          </PaperProvider>
        </SafeAreaProvider>
        <ToastManager />
      </GestureHandlerRootView>
    </Provider>
  );
};
export default RootLayout;
const styles = StyleSheet.create({});
