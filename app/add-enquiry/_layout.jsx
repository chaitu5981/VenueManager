import { Stack } from "expo-router";
import { createContext, useContext, useState } from "react";

const AddEnquiryContext = createContext();
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
const AddEnquiryLayout = () => {
  const [eventDates, setEventDates] = useState([]);
  return (
    <>
      <Header label={"Add Enquiry"} showBackBtn />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="add-events" />
      </Stack>
    </>
  );
};

export default AddEnquiryLayout;
const styles = StyleSheet.create({});
