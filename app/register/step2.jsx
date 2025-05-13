import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { useEffect, useMemo, useRef, useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import { businessLabelTypes, venueTypes } from "../../data/constants";
import CustomSelect from "../../components/CustomSelect";
import CustomButton from "../../components/CustomButton";
import Stepper from "../../components/Stepper";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "../../components/Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
const emptyErrors = {
  name: "",
  type: "",
  phone: "",
  email: "",
  address: "",
  pincode: "",
  country: "",
  state: "",
  city: "",
  businessLabel: "",
  businessNumber: "",
};
const step2 = () => {
  const [venueInfo, setVenueInfo] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    code: "91",
    address: "",
    pincode: "",
    country: {},
    state: {},
    city: {},
    url: "",
    businessLabel: "",
    businessNumber: "",
  });
  const [errors, setErrors] = useState(emptyErrors);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const router = useRouter();
  const locationState = useSelector((state) => state.location);
  const { userId } = useLocalSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchStates = async () => {
      setStates([]);
      try {
        setStatesLoading(true);
        const { data } = await axios(
          `https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/stateList?country_id=${venueInfo.country.id}`
        );
        setStates(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setStatesLoading(false);
      }
    };
    fetchStates();
  }, [venueInfo.country]);

  useEffect(() => {
    const fetchCities = async () => {
      setCities([]);
      try {
        setCitiesLoading(true);
        const { data } = await axios(
          `https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/cityList?state_id=${venueInfo.state.id}`
        );
        setCities(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setCitiesLoading(false);
      }
    };
    fetchCities();
  }, [venueInfo.state]);

  const registerVenue = async () => {
    const {
      name,
      code,
      phone,
      email,
      type,
      country,
      state,
      address,
      city,
      url,
      businessLabel,
      businessNumber,
      pincode,
    } = venueInfo;
    const currency = locationState.countries.find((c) => c.cid === country.id)[
      "currency_code"
    ];
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/venueRegistration",
        {
          user_id: userId,
          venue_name: name,
          venue_type: type,
          country_code: code,
          venue_mobile_no: phone,
          venue_email: email,
          currency,
          country: country.id,
          state: state.id,
          city: city.id,
          address,
          pincode,
          business_label: businessLabel,
          business_number: businessNumber,
          website_url: url,
        }
      );
      if (data.status_code == 200) {
        const venueId = data.data.data;
        Toast.success(data.data.message);
        router.dismissTo("/");
        router.replace({
          pathname: "register/step3",
          params: { userId, venueId },
        });
      } else Toast.error(data.message);
    } catch (error) {
      Toast.error("Internal Error");
    }
  };

  const validateName = (v) => (!v.trim() ? "Please enter valid Name" : "");

  const validatePhone = (v) =>
    v.trim().length !== 10 || isNaN(Number(v.trim()))
      ? "Please enter valid Phone No"
      : "";

  const validateEmail = (v) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(v)) return "Please enter valid Email";
    else return "";
  };

  const validateType = (v) => {
    return !v ? "Please select Venue Type" : "";
  };

  const validateAddress = (v) => {
    return !v.trim() ? "Please enter valid Address" : "";
  };

  const validateCountry = (v) =>
    Object.keys(v).length == 0 ? "Please select Country" : "";

  const validateState = (v) =>
    Object.keys(v).length == 0 ? "Please select State" : "";

  const validatePincode = (v) => (!v.trim() ? "Please enter pincode" : "");

  const validateCity = (v) =>
    Object.keys(v).length == 0 ? "Please select City" : "";

  const validateBusinessLabel = (v) =>
    !v ? "Please select Business Label" : "";

  const validateBusinessNumber = (v) =>
    !v.trim() ? "Please enter Business Number" : "";
  const handleSubmit = () => {
    const nameErr = validateName(venueInfo.name);
    const phoneErr = validatePhone(venueInfo.phone);
    const emailErr = validateEmail(venueInfo.email);
    const typeErr = validateType(venueInfo.type);
    const countryErr = validateCountry(venueInfo.country);
    const stateErr = validateState(venueInfo.state);
    const cityErr = validateCity(venueInfo.city);
    const businessLabelErr = validateBusinessLabel(venueInfo.businessLabel);
    const addressErr = validateAddress(venueInfo.address);
    const businessNumberErr = validateBusinessNumber(venueInfo.businessNumber);
    const pincodeErr = validatePincode(venueInfo.pincode);
    setErrors({
      name: nameErr,
      phone: phoneErr,
      email: emailErr,
      type: typeErr,
      country: countryErr,
      state: stateErr,
      city: cityErr,
      businessLabel: businessLabelErr,
      address: addressErr,
      businessNumber: businessNumberErr,
      pincode: pincodeErr,
    });

    Keyboard.dismiss();
    if (
      !nameErr &&
      !phoneErr &&
      !emailErr &&
      !typeErr &&
      !countryErr &&
      !stateErr &&
      !cityErr &&
      !pincodeErr &&
      !addressErr &&
      !businessLabelErr &&
      !businessNumberErr
    )
      registerVenue();
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Header showBackBtn />
      <Stepper step={2} />
      <ScreenWrapper scrollRef={scrollRef}>
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
            onChange={(v) => {
              setVenueInfo({ ...venueInfo, name: v });
              setErrors({ ...errors, name: validateName(v) });
            }}
          />
          <CustomSelect
            label="Venue Type"
            error={errors.type}
            options={venueTypes}
            value={venueInfo.type}
            onSelect={(v) => {
              setVenueInfo({ ...venueInfo, type: v });
              setErrors({ ...errors, type: validateType(v) });
            }}
          />
          <View
            style={{ flexDirection: "row", gap: 5, alignItems: "flex-start" }}
          >
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
              value={"+" + venueInfo.code}
              onSelect={(v) => setVenueInfo({ ...venueInfo, code: v })}
              customStyle={{ width: 90 }}
            />
            <CustomTextInput
              label={"Phone"}
              value={venueInfo.phone}
              error={errors.phone}
              customStyle={{ flex: 1 }}
              onChange={(v) => {
                setVenueInfo({ ...venueInfo, phone: v });
                setErrors({ ...errors, phone: validatePhone(v) });
              }}
            />
          </View>
          <CustomTextInput
            label={"Email"}
            value={venueInfo.email}
            error={errors.email}
            onChange={(v) => {
              setVenueInfo({ ...venueInfo, email: v });
              setErrors({ ...errors, email: validateEmail(v) });
            }}
          />

          <CustomSelect
            loading={locationState.loading}
            searchable
            options={
              locationState.countries.length > 0
                ? locationState.countries.map((c) => ({
                    label: c.country_name,
                    value: { id: c.cid, name: c.country_name },
                  }))
                : []
            }
            error={errors.country}
            label="Country"
            value={venueInfo.country.name}
            onSelect={(v) => {
              setVenueInfo({
                ...venueInfo,
                country: v,
                state: {},
              });
              setErrors({ ...errors, country: validateCountry(v) });
            }}
          />
          <CustomSelect
            label="State"
            loading={statesLoading}
            error={errors.state}
            searchable
            options={states.map((s) => ({
              value: { id: s.id, name: s.state },
              label: s.state,
            }))}
            value={venueInfo.state.name}
            onSelect={(v) => {
              setVenueInfo({ ...venueInfo, state: v, city: {} });
              setErrors({ ...errors, state: validateState(v) });
            }}
          />
          <CustomSelect
            label="City"
            loading={citiesLoading}
            error={errors.city}
            searchable
            options={cities.map((c) => ({
              value: {
                id: c.id,
                name: c.city,
              },
              label: c.city,
            }))}
            value={venueInfo.city.name}
            onSelect={(v) => {
              setVenueInfo({ ...venueInfo, city: v });
              setErrors({ ...errors, city: validateCity(v) });
            }}
          />
          <CustomTextInput
            label={"Pincode"}
            value={venueInfo.pincode}
            error={errors.pincode}
            onChange={(v) => {
              setVenueInfo({ ...venueInfo, pincode: v });
              setErrors({ ...errors, pincode: validatePincode(v) });
            }}
          />
          <CustomTextInput
            label={"Address"}
            value={venueInfo.address}
            error={errors.address}
            onChange={(v) => {
              setVenueInfo({ ...venueInfo, address: v });
              setErrors({ ...errors, address: validateAddress(v) });
            }}
          />
          <CustomTextInput
            label={"Website URL(optional)"}
            value={venueInfo.url}
            onChange={(t) => setVenueInfo({ ...venueInfo, url: t })}
          />
          <CustomSelect
            label="GST/PAN/VAT/Business Label"
            error={errors.businessLabel}
            options={businessLabelTypes}
            value={venueInfo.businessLabel}
            onSelect={(v) => {
              setVenueInfo({ ...venueInfo, businessLabel: v });
              setErrors({ ...errors, businessLabel: validateBusinessLabel(v) });
            }}
          />
          <CustomTextInput
            label={"GST/PAN/VAT/Business Number"}
            value={venueInfo.businessNumber}
            error={errors.businessNumber}
            onChange={(v) => {
              setVenueInfo({ ...venueInfo, businessNumber: v });
              setErrors({
                ...errors,
                businessNumber: validateBusinessNumber(v),
              });
            }}
          />
        </View>
        <CustomButton onPress={handleSubmit} text={"Next"} loading={loading} />
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};
export default step2;
const styles = StyleSheet.create({});
