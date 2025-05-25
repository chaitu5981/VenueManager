import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  View,
} from "react-native";
import Typo from "../../components/Typo";
import { TextInput } from "react-native-paper";
import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import ScreenWrapper from "../../components/ScreenWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import Stepper from "../../components/Stepper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../components/CustomSelect";
import { Toast } from "toastify-react-native";
import axios from "axios";
import { getUserInfo } from "../../store/userSlice";
const initialFormData = {
  name: "",
  phone: "",
  code: "91",
  email: "",
  password: "",
  confirmPwd: "",
};
const Step1 = () => {
  const { editing = false } = useLocalSearchParams();
  const {
    user,
    error,
    loading: userLoading,
  } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(initialFormData);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    code: "",
    password: "",
    confirmPwd: "",
  });
  const locationState = useSelector((state) => state.location);
  const router = useRouter();
  const dispatch = useDispatch();
  const countryOptions = useMemo(() => {
    return locationState.countries.map((c) => ({
      label: "+" + c.country_code,
      value: c.country_code,
    }));
  }, [locationState.countries]);
  useEffect(() => {
    if (editing)
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.mobile_no || "",
        code: user?.country_code || "91",
      });
  }, [editing, user]);
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
    const nameErr = validateName(formData?.name);
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
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/registration`,
          {
            name: formData?.name,
            country_code: formData.code,
            mobile_no: formData.phone,
            email: formData.email,
            is_otp_verified: false,
            firebase_token: "web",
            user_type_id: "001",
            password: formData.password,
          }
        );
        if (!data.isEmailAlreadyExist && data.status_code == 200) {
          Toast.success(
            "OTP sent successfully on your registered email / mobile no"
          );
          router.replace({
            pathname: "/otp",
            params: {
              userId: data.user_id,
              email: formData.email,
              source: "register",
            },
          });
        }
        if (data.isEmailAlreadyExist) {
          Alert.alert("Alert", "User already registered.Do you want to Login", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Confirm",
              style: "default",
              onPress: () => router.replace("/login"),
            },
          ]);
        }
      } catch (error) {
        Toast.error("Internal Error");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleUpdate = async () => {
    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);
    setErrors({
      name: nameErr,
      phone: phoneErr,
    });
    if (!nameErr && !phoneErr) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/updateUserRegistration`,
          {
            user_id: user.user_id,
            name: formData?.name,
            country_code: formData.code,
            mobile_no: formData.phone,
          }
        );
        if (data.status_code == 200) {
          Keyboard.dismiss();
          Toast.success(data.message);
          await dispatch(getUserInfo(user.user_id));
          if (error) Toast.error(error);
          router.back();
        } else {
          Toast.error(data.message);
        }
      } catch (error) {
        Toast.error("Internal Error");
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.mobile_no,
          code: user.country_code,
        });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label={editing && "Update Profile"} showBackBtn />
      {editing ? <></> : <Stepper step={1} />}
      <ScreenWrapper>
        <View>
          <Typo size={20} weight={700} position={"center"}>
            Personal Information
          </Typo>
          <Typo size={15} weight={500} position={"center"}>
            {editing ? "Update" : "Add"} Below Details
          </Typo>
        </View>
        <View style={{ flexGrow: 1, gap: 15 }}>
          <CustomTextInput
            label={"Your Name"}
            error={errors?.name}
            value={formData?.name}
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
              options={locationState.countries.length > 0 ? countryOptions : []}
              onSelect={(v) => setFormData({ ...formData, code: v })}
              customStyle={{ width: 100 }}
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
            editable={!editing}
            error={errors.email}
            onChange={(v) => {
              setFormData({ ...formData, email: v });
              setErrors({ ...errors, email: validateEmail(v) });
            }}
          />
          {editing ? (
            <></>
          ) : (
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
                editing ? undefined : (
                  <TextInput.Icon
                    icon={showPwd ? "eye-off" : "eye"}
                    onPress={() => setShowPwd(!showPwd)}
                  />
                )
              }
            />
          )}

          {editing ? (
            <></>
          ) : (
            <CustomTextInput
              label={"Confirm Password"}
              secureTextEntry={!showConfirmPwd}
              right={
                editing || (
                  <TextInput.Icon
                    icon={showConfirmPwd ? "eye-off" : "eye"}
                    onPress={() => setShowConfirmPwd(!showConfirmPwd)}
                  />
                )
              }
              value={formData.confirmPwd}
              error={errors.confirmPwd}
              onChange={(v) => {
                setFormData({ ...formData, confirmPwd: v });
                setErrors({ ...errors, confirmPwd: validateConfirmPwd(v) });
              }}
            />
          )}
        </View>
        <CustomButton
          text={editing ? "Update" : "Next"}
          onPress={editing ? handleUpdate : handleSubmit}
          loading={loading || userLoading}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default Step1;
const styles = StyleSheet.create({});
