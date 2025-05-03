import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import { venueTypes } from "../../data/constants";
import CustomSelect from "../../components/CustomSelect";
import { countries } from "../../data/constants";
import { states } from "../../data/constants";
import { cities } from "../../data/constants";
import { currencies } from "../../data/constants";
import CustomButton from "../../components/CustomButton";
import Stepper from "../../components/Stepper";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
const step2 = () => {
  const [venueInfo, setVenueInfo] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    currency: "inr",
    address: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    url: "",
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    type: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    currency: "",
  });
  const router = useRouter();
  const handleSubmit = () => {
    Keyboard.dismiss();
    router.push("register/step3");
  };
  return (
    <View style={{ flex: 1 }}>
      <Header showBackBtn />
      <Stepper step={2} />
      <ScreenWrapper>
        <View>
          <Typo size={20} weight={700}>
            Venue Registration
          </Typo>
          <Typo size={15} weight={500}>
            Add Below Details
          </Typo>
        </View>
        <View style={{ flexGrow: 1, gap: 15 }}>
          <CustomTextInput
            label={"Venue Name"}
            value={venueInfo.name}
            error={errors.name}
            onChange={(t) => setVenueInfo({ ...venueInfo, name: t })}
          />
          <CustomSelect
            label="Venue Type"
            error={errors.type}
            options={venueTypes}
            value={venueInfo.type}
            onSelect={(v) => setVenueInfo({ ...venueInfo, type: v })}
          />
          <CustomTextInput
            label={"Phone"}
            value={venueInfo.phone}
            error={errors.phone}
            onChange={(t) => setVenueInfo({ ...venueInfo, phone: t })}
          />
          <CustomTextInput
            label={"Email"}
            value={venueInfo.email}
            error={errors.email}
            onChange={(t) => setVenueInfo({ ...venueInfo, email: t })}
          />
          <CustomSelect
            label="Currency"
            error={errors.currency}
            options={currencies}
            value={venueInfo.currency}
            onSelect={(v) => setVenueInfo({ ...venueInfo, currency: v })}
          />
          <CustomSelect
            options={countries}
            error={errors.country}
            label="Country"
            value={venueInfo.country}
            onSelect={(v) => setVenueInfo({ ...venueInfo, country: v })}
          />
          <CustomSelect
            label="State"
            error={errors.state}
            options={states}
            value={venueInfo.state}
            onSelect={(v) => setVenueInfo({ ...venueInfo, state: v })}
          />
          <CustomSelect
            label="City"
            error={errors.city}
            options={cities}
            value={venueInfo.city}
            onSelect={(v) => setVenueInfo({ ...venueInfo, city: v })}
          />
          <CustomTextInput
            label={"Pincode"}
            value={venueInfo.pincode}
            error={errors.pincode}
            onChange={(t) => setVenueInfo({ ...venueInfo, pincode: t })}
          />
          <CustomTextInput
            label={"Address"}
            value={venueInfo.address}
            error={errors.address}
            onChange={(t) => setVenueInfo({ ...venueInfo, address: t })}
          />
          <CustomTextInput
            label={"Website URL"}
            value={venueInfo.url}
            onChange={(t) => setVenueInfo({ ...venueInfo, naurlme: t })}
          />
        </View>
        <CustomButton onPress={handleSubmit} text={"NEXT"} />
      </ScreenWrapper>
    </View>
  );
};
export default step2;
const styles = StyleSheet.create({});
