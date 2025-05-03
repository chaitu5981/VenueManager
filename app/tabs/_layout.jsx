import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const Tabslayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="appointments" />
      <Tabs.Screen name="events" />
      <Tabs.Screen name="follow-ups" />
    </Tabs>
  );
};
export default Tabslayout;
const styles = StyleSheet.create({});
