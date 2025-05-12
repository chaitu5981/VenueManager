import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Typo from "../../components/Typo";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { useRegisterContext } from "./_layout";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import ScreenWrapper from "../../components/ScreenWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import Stepper from "../../components/Stepper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../components/CustomSelect";
import { registerUser } from "../../store/authSlice";
import { Toast } from "toastify-react-native";
const initialFormData = {
  name: "",
  phone: "",
  code: "91",
  email: "",
  password: "",
  confirmPwd: "",
};
const Step1 = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    code: "",
    password: "",
    confirmPwd: "",
  });
  const locationState = useSelector((state) => state.location);
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const validateName = (v) => {
    if (v.trim().length == 0) return "Enter Valid Name";
    else return "";
  };
  const validatePhone = (v) => {
    if (v.trim().length != 10 || isNaN(Number(v.trim())))
      return "Enter Valid Phone no";
    else return "";
  };

  const validateEmail = (v) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(v)) return "Enter Valid Email";
    else return "";
  };

  const validatePassword = (v) => {
    if (v.length < 6) return "Password Should be at least 6 Characters";
    else return "";
  };

  const validateConfirmPwd = (v) => {
    if (v.length < 6) return "Password Should be at least 6 Characters";
    else if (v !== formData.password)
      return "Password and Confirm Password Should Match";
    else return "";
  };

  const handleSubmit = async () => {
    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);
    const emailErr = validateEmail(formData.email);
    const pwdErr = validatePassword(formData.password);
    const confirmPwdErr = validateConfirmPwd(formData.confirmPwd);
    setErrors({
      name: nameErr,
      phone: phoneErr,
      email: emailErr,
      password: pwdErr,
      confirmPwd: confirmPwdErr,
    });
    if (!nameErr && !phoneErr && !emailErr && !pwdErr && !confirmPwdErr) {
      const result = await dispatch(
        registerUser({
          name: formData.name,
          country_code: formData.code,
          mobile_no: formData.phone,
          email: formData.email,
          is_otp_verified: false,
          firebase_token: "web",
          user_type_id: "001",
          password: formData.password,
        })
      );
      if (registerUser.fulfilled.match(result)) {
        console.log("Hi");
        router.push({
          pathname: "/otp",
          params: {
            userId: result.payload.data.user_id,
            email: formData.email,
            source: "register",
          },
        });
        setFormData(initialFormData);
      }
      if (registerUser.rejected.match(result)) {
        Toast.error(result.payload.data.message);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header showBackBtn />
      <Stepper step={1} />
      <ScreenWrapper>
        <View>
          <Typo size={20} weight={700}>
            Personal Information
          </Typo>
          <Typo size={15} weight={500}>
            Add Below Details
          </Typo>
        </View>
        <View style={{ flexGrow: 1, gap: 15 }}>
          <CustomTextInput
            label={"Your Name"}
            error={errors.name}
            value={formData.name}
            onChange={(v) => {
              setFormData({ ...formData, name: v });
              setErrors({ ...errors, name: validateName(v) });
            }}
          />
          <View style={{ flexDirection: "row", gap: 5 }}>
            <CustomSelect
              label={"Code"}
              loading={locationState.loading}
              value={"+" + formData.code}
              searchable
              options={
                locationState.countries.length > 0
                  ? locationState.countries.map((c) => ({
                      label: "+" + c.country_code,
                      value: c.country_code,
                    }))
                  : []
              }
              onSelect={(v) => setFormData({ ...formData, code: v })}
              customStyle={{ width: 90 }}
            />
            <CustomTextInput
              customStyle={{ flex: 1 }}
              label={"Phone No"}
              keyboardType={"numeric"}
              error={errors.phone}
              value={formData.phone}
              onChange={(v) => {
                setFormData({ ...formData, phone: v });
                setErrors({ ...errors, phone: validatePhone(v) });
              }}
            />
          </View>

          <CustomTextInput
            label={"Email Id"}
            value={formData.email}
            error={errors.email}
            onChange={(v) => {
              setFormData({ ...formData, email: v });
              setErrors({ ...errors, email: validateEmail(v) });
            }}
          />
          <CustomTextInput
            label={"Password"}
            value={formData.password}
            error={errors.password}
            secureTextEntry={!showPwd}
            onChange={(v) => {
              setFormData({ ...formData, password: v });
              setErrors({ ...errors, password: validatePassword(v) });
            }}
            right={
              <TextInput.Icon
                icon={showPwd ? "eye-off" : "eye"}
                onPress={() => setShowPwd(!showPwd)}
              />
            }
          />

          <CustomTextInput
            label={"Confirm Password"}
            secureTextEntry={!showConfirmPwd}
            right={
              <TextInput.Icon
                icon={showConfirmPwd ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPwd(!showConfirmPwd)}
              />
            }
            value={formData.confirmPwd}
            error={errors.confirmPwd}
            onChange={(v) => {
              setFormData({ ...formData, confirmPwd: v });
              setErrors({ ...errors, confirmPwd: validateConfirmPwd(v) });
            }}
          />
        </View>
        <CustomButton
          text={"Next"}
          onPress={handleSubmit}
          loading={authState.loading}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default Step1;
const styles = StyleSheet.create({});
