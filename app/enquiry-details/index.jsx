import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../data/theme";
import {
  fetchDate,
  fetchDate1,
  fetchDateAndTime,
  fetchTime,
} from "../../utils/helper";
import CustomSelect from "../../components/CustomSelect";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { getEnquiryDetails } from "../../store/enquirySlice";
import { Toast } from "toastify-react-native";
import Loader from "../../components/Loader";
const EnquiryDetails = () => {
  const { enquiryId } = useLocalSearchParams();
  const { currEnquiry, loading } = useSelector((state) => state.enquiry);
  const { subVenues } = useSelector((state) => state.user);
  const name = currEnquiry?.enquiry_info?.name;
  const appointment_id = currEnquiry?.enquiry_info?.appointment_id;
  const phone_no = currEnquiry?.enquiry_info?.phone_no;
  const created_date = currEnquiry?.enquiry_info?.created_date;
  const event_info = currEnquiry?.event_info;
  const eventNames =
    event_info?.length > 0
      ? event_info?.map((e) => ({
          label: e?.event_name,
          value: e?.id,
        }))
      : [];
  const [eventId, setEventId] = useState("");
  let event;
  if (event_info) event = event_info.find((e) => e.id == eventId);
  const router = useRouter();
  const getSubVenueName = (subVenueId) => {
    return subVenues?.length > 0
      ? subVenues?.find((s) => s.sub_venue_id == subVenueId).sub_venue_name
      : "";
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (event_info?.length > 0) setEventId(event_info[0].id);
  }, [event_info]);
  useFocusEffect(
    useCallback(() => {
      const fetchEnquiryDetails = async () => {
        const res = await dispatch(getEnquiryDetails(enquiryId)).unwrap();
        if (res.status_code != 200) Toast.error(res.message);
      };
      fetchEnquiryDetails();
    }, [enquiryId])
  );

  if (loading) return <Loader size={30} />;
  else
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header label={"Enquiry-Details"} showBackBtn />
        <ScreenWrapper>
          <Typo size={20} weight={800} position={"center"}>
            {name}
          </Typo>
          <Typo size={20} position={"center"}>
            {appointment_id}
          </Typo>
          <CustomButton
            text="Update Status"
            customStyle={{ backgroundColor: colors.secondary, height: 50 }}
            labelSize={16}
            icon={"list-status"}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomButton
              text={"Appointments"}
              customStyle={{
                backgroundColor: colors.secondary,
                height: 50,
                width: "48%",
              }}
              icon="calendar-clock-outline"
              labelSize={16}
            />
            <CustomButton
              text="Follow-ups"
              icon="account-group"
              customStyle={{
                backgroundColor: colors.secondary,
                height: 50,
                width: "48%",
              }}
              labelSize={16}
            />
          </View>
          <View style={styles.card}>
            <View style={styles.contact}>
              <View>
                <Typo>Mobile</Typo>
                <Typo weight={800} size={16}>
                  {phone_no}
                </Typo>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <View style={[styles.icon, { backgroundColor: colors.green }]}>
                  <FontAwesome name="phone" size={15} color="white" />
                </View>
                <View
                  style={[styles.icon, { backgroundColor: colors.primary }]}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color="white"
                  />
                </View>
                <View style={[styles.icon, { backgroundColor: colors.blue }]}>
                  <MaterialCommunityIcons
                    name="message-reply-text-outline"
                    size={24}
                    color="white"
                  />
                </View>
              </View>
            </View>
            <View style={{ gap: 5, paddingVertical: 10 }}>
              <Typo>Record Created On</Typo>
              <Typo size={16} weight={800}>
                {fetchDateAndTime(created_date)}
              </Typo>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomSelect
                options={eventNames}
                label="Event"
                onSelect={(v) => setEventId(v)}
                value={eventNames?.find((e) => e.value == eventId)?.label}
                textStyle={{ fontWeight: 800 }}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/add-enquiry/add-events",
                  params: { editing: true, enquiryId: appointment_id },
                })
              }
            >
              <Feather name="edit" size={35} color="black" />
            </TouchableOpacity>
          </View>
          {event && (
            <View style={{ gap: 10 }}>
              <Typo color={colors.secondary} size={16} weight={800}>
                Event Date :{" "}
                <Typo weight={800} color={"black"}>
                  {fetchDate1(event?.event_date)}
                </Typo>
              </Typo>
              <Typo color={colors.secondary} weight={800} size={16}>
                Sub Venue Details
              </Typo>
              <View style={styles.card}>
                <View style={{ gap: 5, paddingVertical: 10 }}>
                  <Typo>Sub Venue Name</Typo>
                  <Typo weight={800}>
                    {getSubVenueName(event?.event_subvenue_id)}
                  </Typo>
                </View>
                <View style={styles.line} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                  }}
                >
                  <View style={{ gap: 5 }}>
                    <Typo>Booking For</Typo>
                    <Typo weight={800}>
                      {event.event_booking_for
                        .filter((b) => b != "WholeDay")
                        .join(",")}
                    </Typo>
                  </View>
                  <View style={{ gap: 5 }}>
                    <Typo>No Of Guests</Typo>
                    <Typo weight={800}>{event?.event_no_of_guests}</Typo>
                  </View>
                </View>
                <View style={styles.line} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                  }}
                >
                  <View style={{ gap: 5 }}>
                    <Typo>Check In</Typo>
                    <Typo weight={800}>{fetchTime(event.event_check_in)}</Typo>
                  </View>
                  <View style={{ gap: 5 }}>
                    <Typo>Check Out</Typo>
                    <Typo weight={800}>
                      {fetchTime(event?.event_check_out)}
                    </Typo>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScreenWrapper>
      </SafeAreaView>
    );
};
export default EnquiryDetails;
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightgray,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: colors.gray,
  },
});
