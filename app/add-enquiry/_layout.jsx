import { Stack } from "expo-router";
import { useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
const AddEnquiryLayout = () => {
  const [eventDates, setEventDates] = useState([]);
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="add-events" />
      </Stack>
    </>
  );
};

export default AddEnquiryLayout;
const styles = StyleSheet.create({});
