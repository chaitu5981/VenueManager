import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import DatePicker from "../../components/DatePicker";
import CustomButton from "../../components/CustomButton";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useRouter } from "expo-router";
import { formatDate } from "../../utils/helper";
import { useAddEnquiryContext } from "./_layout";
import { SafeAreaView } from "react-native-safe-area-context";
const emptyErrors = {
  name: "",
  phone: "",
  email: "",
  eventDates: "",
  address: "",
};

const AddEnquiry = () => {
  const { enquiry, setEnquiry, eventDates, setEventDates } =
    useAddEnquiryContext();
  const [formData, setFormData] = useState({ ...enquiry, eventDates });
  const [errors, setErrors] = useState(emptyErrors);
  const router = useRouter();
  const handleSubmit = () => {
    let newErrors = { ...emptyErrors };
    let isValid = true;
    const { name, phone, email, eventDates: dates, address, notes } = formData;
    if (!name.trim()) {
      newErrors.name = "Please enter name";
      isValid = false;
    }
    if (isNaN(Number(phone)) || phone.trim().length !== 10) {
      newErrors.phone = "Please enter valid phone number";
      isValid = false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (email && !emailRegex.test(email)) {
      (newErrors.email = "Please enter valid email"), (isValid = false);
    }
    if (dates.length === 0) {
      newErrors.eventDates = "Please enter dates of events";
      isValid = false;
    }
    if (!address) {
      newErrors.address = "Please enter address";
      isValid = false;
    }
    if (!isValid) {
      setErrors(newErrors);
    } else {
      setErrors(emptyErrors);
      setEnquiry({ ...enquiry, name, phone, email, address, notes });
      setEventDates(dates);
      router.push({ pathname: "add-enquiry/add-events" });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenWrapper>
        <CustomTextInput
          label={"Enquiry Person Name"}
          value={formData.name}
          error={errors.name}
          onChange={(v) => setFormData({ ...formData, name: v })}
        />
        <View style={{ flexDirection: "row", gap: 5 }}>
          <View>
            <TextInput
              value="+91"
              label={"Code"}
              mode="outlined"
              style={{ width: 80, alignSelf: "auto" }}
            />
          </View>
          <CustomTextInput
            customStyle={{ flex: 1 }}
            label={"Phone No"}
            keyboardType={"numeric"}
            maxLength={10}
            error={errors.phone}
            value={formData.phone}
            onChange={(text) => setFormData({ ...formData, phone: text })}
          />
        </View>
        <CustomTextInput
          label={"Email(optional)"}
          value={formData.email}
          error={errors.email}
          onChange={(v) => setFormData({ ...formData, email: v })}
        />
        <View>
          <DatePicker
            eventDates={formData.eventDates}
            onChange={(dates) =>
              setFormData({ ...formData, eventDates: dates })
            }
          />
          {errors.eventDates && (
            <HelperText visible={!!errors.eventDates} type="error">
              {errors.eventDates}
            </HelperText>
          )}
        </View>
        <CustomTextInput
          label={"Address"}
          value={formData.address}
          error={errors.address}
          onChange={(v) => setFormData({ ...formData, address: v })}
        />
        <CustomTextInput
          multiline
          label={"Notes(optional)"}
          value={formData.notes}
          inputStyle={{ height: 100 }}
          onChange={(v) => setFormData({ ...formData, notes: v })}
        />
        <CustomButton text="NEXT" onPress={handleSubmit} />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default AddEnquiry;
const styles = StyleSheet.create({});
