import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { useAddEnquiryContext } from "./_layout";
import { formatDate } from "../../utils/helper";
import EventForm from "../../components/EventForm";
const DisplayInfo = ({ label, value }) => (
  <View style={{ flexDirection: "row", gap: 2 }}>
    <Typo weight={800}>{label} : </Typo>
    <Typo style={{ flex: 1 }}>{value}</Typo>
  </View>
);
const AddEvents = () => {
  const { enquiry, eventDates } = useAddEnquiryContext();
  const { name, phone, address } = enquiry;
  return (
    <ScreenWrapper>
      <View style={{ backgroundColor: "#ECECEC", padding: 10 }}>
        <DisplayInfo label="Person Name" value={name} />
        <DisplayInfo label="Mobile" value={phone} />
        <DisplayInfo
          label="Event Dates"
          value={eventDates.map((d) => formatDate(d)).join(",")}
        />
        <DisplayInfo label="Address" value={address} />
      </View>
      <EventForm />
    </ScreenWrapper>
  );
};
export default AddEvents;
const styles = StyleSheet.create({});
