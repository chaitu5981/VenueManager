import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import CustomTextInput from "../../components/CustomTextInput";
import { useEffect, useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import DatePicker from "../../components/DatePicker";
import CustomButton from "../../components/CustomButton";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  formatDate,
  validateAddress,
  validateEmail,
  validateName,
  validatePhone,
} from "../../utils/helper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../components/CustomSelect";
import axios from "axios";
import { Toast } from "toastify-react-native";
import { getEnquiryDetails } from "../../store/enquirySlice";
const emptyErrors = {
  name: "",
  phone: "",
  email: "",
  eventDates: "",
  notes: "",
};

const AddEnquiry = () => {
  const {
    enquiryId = null,
    editing = false,
    userId,
    enquiry: inputEnquiry,
  } = useLocalSearchParams();
  const { loading: enquiryLoading } = useSelector((state) => state.enquiry);
  const [loading, setLoading] = useState(false);
  const [enquiry, setEnquiry] = useState({
    name: "",
    code: "91",
    phone: "",
    email: "",
    notes: "",
    eventDates: [],
  });
  const [errors, setErrors] = useState(emptyErrors);
  const { user } = useSelector((state) => state.user);
  const locationState = useSelector((state) => state.location);
  const router = useRouter();
  const dispatch = useDispatch();
  const validateDates = (dates) => {
    if (dates.length === 0) return "Enter at least one date";
    else return "";
  };
  const validateNotes = (notes) => {
    if (notes.length < 5) return "Enter at least 5 characters";
    else return "";
  };
  const handleSubmit = async () => {
    const { name, phone, email, eventDates, notes, code } = enquiry;
    const nameErr = validateName(name);
    const phoneErr = validatePhone(phone);
    const emailErr = validateEmail(email);
    const eventDatesErr = validateDates(eventDates);
    const notesErr = validateNotes(notes);
    const newErrors = {
      name: nameErr,
      phone: phoneErr,
      email: emailErr,
      eventDates: eventDatesErr,
      notes: notesErr,
    };
    setErrors(newErrors);
    if (!nameErr && !phoneErr && !emailErr && !eventDatesErr && !notesErr) {
      try {
        setLoading(true);
        let payload = {
          user_id: userId || user.user_id,
          name,
          country_code: code,
          phone_no: phone,
          email,
          appointment_date: eventDates,
          notes,
          enquiry_id: enquiryId || "",
        };
        if (editing)
          payload = {
            ...payload,
            appointment_id: enquiryId,
          };
        const { data } = await axios.post(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/enquiry/${
            editing ? "update" : "add"
          }Enquiry`,
          payload
        );
        if (data.status_code == 200) {
          Toast.success(data.message);
          const res = await dispatch(
            getEnquiryDetails(data.enquiry_id)
          ).unwrap();
          if (res.status_code == 200)
            if (!editing)
              router.replace({
                pathname: "/add-enquiry/add-events",
                params: {
                  enquiryId: data.enquiry_id,
                },
              });
            else router.back();
        } else Toast.error(data.message);
      } catch (error) {
        console.log(error);
        Toast.error("Internal Error");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (editing) {
      setEnquiry(JSON.parse(inputEnquiry));
    }
  }, [editing, enquiryId]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label={`${editing ? "Update" : "Add"} Enquiry`} showBackBtn />

      <ScreenWrapper>
        <CustomTextInput
          label={"Enquiry Person Name"}
          value={enquiry.name}
          error={errors.name}
          onChange={(v) => {
            setEnquiry({ ...enquiry, name: v });
            setErrors({ ...errors, name: validateName(v) });
          }}
        />
        <View style={{ flexDirection: "row", gap: 5 }}>
          <CustomSelect
            label={"Code"}
            loading={locationState.loading}
            searchable
            options={
              locationState.countries.length > 0
                ? locationState.countries.map((c) => ({
                    label: "+" + c.country_code,
                    value: c.country_code,
                  }))
                : []
            }
            value={"+" + enquiry.code}
            onSelect={(v) => setEnquiry({ ...enquiry, code: v })}
            customStyle={{ width: 100 }}
          />
          <CustomTextInput
            label={"Phone"}
            value={enquiry.phone}
            error={errors.phone}
            customStyle={{ flex: 1 }}
            onChange={(v) => {
              setEnquiry({ ...enquiry, phone: v });
              setErrors({ ...errors, phone: validatePhone(v) });
            }}
          />
        </View>
        <CustomTextInput
          label={"Email"}
          value={enquiry.email}
          error={errors.email}
          onChange={(v) => {
            setEnquiry({ ...enquiry, email: v });
            setErrors({ ...errors, email: validateEmail(v) });
          }}
        />
        <View>
          <DatePicker
            eventDates={enquiry.eventDates}
            onChange={(dates) => {
              setEnquiry({
                ...enquiry,
                eventDates: dates.map((d) => new Date(d)),
              });
              setErrors({ ...errors, eventDates: validateDates(dates) });
            }}
          />
          {errors.eventDates && (
            <HelperText visible={!!errors.eventDates} type="error">
              {errors.eventDates}
            </HelperText>
          )}
        </View>
        {/* <CustomTextInput
          label={"Address"}
          value={enquiry.address}
          error={errors.address}
          onChange={(v) => {
            setEnquiry({ ...enquiry, address: v });
            setErrors({ ...errors, address: validateAddress(v) });
          }}
        /> */}
        <CustomTextInput
          multiline
          label={"Notes"}
          value={enquiry.notes}
          error={errors.notes}
          inputStyle={{ height: 100 }}
          onChange={(v) => {
            setEnquiry({ ...enquiry, notes: v });
            setErrors({ ...errors, notes: validateNotes(v) });
          }}
        />
        <CustomButton
          text="Submit"
          onPress={handleSubmit}
          loading={loading || enquiryLoading}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default AddEnquiry;
const styles = StyleSheet.create({});
