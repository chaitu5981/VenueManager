import { Stack } from "expo-router";
import { createContext, useContext, useState } from "react";

const AddEnquiryContext = createContext();
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
const AddEnquiryLayout = () => {
  const [enquiry, setEnquiry] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    events: [],
  });
  const [eventDates, setEventDates] = useState([]);
  console.log(enquiry);
  return (
    <AddEnquiryContext.Provider
      value={{ enquiry, setEnquiry, eventDates, setEventDates }}
    >
      <Header label={"Add Enquiry"} showBackBtn />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="add-events" />
      </Stack>
    </AddEnquiryContext.Provider>
  );
};

export const useAddEnquiryContext = () => useContext(AddEnquiryContext);
export default AddEnquiryLayout;
const styles = StyleSheet.create({});
