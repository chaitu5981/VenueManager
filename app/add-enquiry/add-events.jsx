import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { fetchDate, formatDate } from "../../utils/helper";
import EventForm from "../../components/EventForm";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "toastify-react-native";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnquiries } from "../../store/enquirySlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
const DisplayInfo = ({ label, value }) => (
  <View style={{ flexDirection: "row", gap: 2 }}>
    <Typo weight={800}>{label} : </Typo>
    <Typo style={{ flex: 1 }}>{value}</Typo>
  </View>
);
const AddEvents = () => {
  const { enquiryId = null, editing = false } = useLocalSearchParams();
  // console.log(enquiryId, "search params");
  const [addEventsLoading, setAddEventsLoading] = useState(false);
  const [enquiry, setEnquiry] = useState({
    name: "",
    code: "",
    phone: "",
    email: "",
    notes: "",
    eventDates: [],
  });
  const router = useRouter();
  const { currEnquiry } = useSelector((state) => state.enquiry);
  let {
    user: { user_id: userId },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const {
        name,
        phone_no,
        country_code,
        email,
        appointment_date,
        notes,
        user_id,
      } = currEnquiry.enquiry_info;
      setEnquiry({
        name,
        code: country_code,
        phone: phone_no,
        email,
        notes,
        eventDates: appointment_date,
      });
      userId = user_id;
    }, [currEnquiry])
  );
  const handleSubmit = async (events) => {
    try {
      setAddEventsLoading(true);
      const req = {
        enquiry: {
          user_id: userId,
          enquiry_id: enquiryId,
          name: enquiry.name,
          country_code: enquiry.code,
          phone_no: enquiry.phone,
          email: enquiry.email,
          appointment_date: enquiry.eventDates,
          notes: enquiry.notes,
        },
        events,
      };
      // console.log(req);
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/enquiry/addUpdateEvents`,
        req
      );
      if (data.status_code == 200) {
        router.back();
      } else Toast.error(data.message);
    } catch (error) {
      console.log(error);
      Toast.error("Internal Error");
    } finally {
      setAddEventsLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label={`${editing ? "Update" : "Add"} Enquiry`} showBackBtn />

      <ScreenWrapper>
        <View
          style={{
            backgroundColor: "#ECECEC",
            padding: 10,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1 }}>
            <DisplayInfo label="Person Name" value={enquiry.name} />
            <DisplayInfo label="Mobile" value={enquiry.phone} />
            <DisplayInfo
              label="Event Dates"
              value={enquiry.eventDates.map((d) => fetchDate(d)).join(",")}
            />
            <DisplayInfo label="Email" value={enquiry.email} />
          </View>
          {editing && (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/add-enquiry",
                  params: {
                    enquiryId,
                    userId,
                    editing: true,
                    enquiry: JSON.stringify(enquiry),
                  },
                })
              }
            >
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <EventForm
          events={editing ? currEnquiry.event_info : []}
          editing={editing}
          eventDates={enquiry.eventDates}
          submitEnquiry={handleSubmit}
          loading={addEventsLoading}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default AddEvents;
const styles = StyleSheet.create({});
