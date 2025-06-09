import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { formatDate } from "../../utils/helper";
import EventForm from "../../components/EventForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "toastify-react-native";
import Loader from "../../components/Loader";
const DisplayInfo = ({ label, value }) => (
  <View style={{ flexDirection: "row", gap: 2 }}>
    <Typo weight={800}>{label} : </Typo>
    <Typo style={{ flex: 1 }}>{value}</Typo>
  </View>
);
const AddEvents = () => {
  const { enquiryId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [addEventsLoading, setAddEventsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [enquiry, setEnquiry] = useState({
    userId: "",
    name: "",
    code: "",
    phone: "",
    email: "",
    notes: "",
    eventDates: [],
  });
  const router = useRouter();
  useEffect(() => {
    const fetchEnquiry = async () => {
      console.log(enquiryId, "Enquiry Id");
      try {
        setLoading(true);
        const { data } = await axios(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/enquiry/getEnquiryDetails?enquiry_id=${enquiryId}`
        );
        if (data.status_code == 200) {
          const {
            name,
            phone_no,
            country_code,
            email,
            appointment_date,
            notes,
            user_id,
          } = data.enquiry_info;
          setEnquiry({
            userId: user_id,
            name,
            code: country_code,
            phone: phone_no,
            email,
            notes,
            eventDates: appointment_date,
          });
        } else {
          Toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        Toast.error("Internal Error");
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiry();
  }, [enquiryId]);
  const handleSubmit = async () => {
    try {
      setAddEventsLoading(true);
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/enquiry/addUpdateEvents`,
        {
          enquiry: {
            user_id: enquiry.userId,
            enquiry_id: enquiryId,
            name: enquiry.name,
            country_code: enquiry.code,
            phone_no: enquiry.phone,
            email: enquiry.email,
            appointment_date: enquiry.eventDates,
            notes: enquiry.notes,
          },
          events,
        }
      );
      if (data.status_code == 200) {
        Toast.success(data.message);
        router.back(2);
      } else Toast.error(data.message);
    } catch (error) {
      console.log(error);
      Toast.error("Internal Error");
    } finally {
      setAddEventsLoading(false);
    }
  };
  if (loading) return <Loader size={30} />;
  return (
    <ScreenWrapper>
      <View style={{ backgroundColor: "#ECECEC", padding: 10 }}>
        <DisplayInfo label="Person Name" value={enquiry.name} />
        <DisplayInfo label="Mobile" value={enquiry.phone} />
        <DisplayInfo
          label="Event Dates"
          value={enquiry.eventDates.map((d) => formatDate(d)).join(",")}
        />
        <DisplayInfo label="Email" value={enquiry.email} />
      </View>
      <EventForm
        setEvents={setEvents}
        eventDates={enquiry.eventDates}
        submitEnquiry={handleSubmit}
        loading={addEventsLoading}
      />
    </ScreenWrapper>
  );
};
export default AddEvents;
const styles = StyleSheet.create({});
