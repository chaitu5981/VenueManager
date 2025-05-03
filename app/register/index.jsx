import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Typo from "../../components/Typo";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useState } from "react";
import { useRegisterContext } from "./_layout";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import ScreenWrapper from "../../components/ScreenWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import Stepper from "../../components/Stepper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
const Step1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPwd: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [error, setError] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPwd: "",
  });
  const router = useRouter();
  const handleSubmit = () => {
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPwd: "",
    };
    let isValid = true;
    if (formData.name.trim().length == 0) {
      newErrors.name = "Please enter valid Name";
      isValid = false;
    }
    if (formData.phone.trim().length != 10) {
      newErrors.phone = "Please enter valid Phone no";
      isValid = false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(formData?.email)) {
      newErrors.email = "Please enter valid Email";
      isValid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
      isValid = false;
    }
    if (formData.password !== formData.confirmPwd) {
      newErrors.confirmPwd = "Confirm Password should match Password";
      isValid = false;
    }
    setError(newErrors);
    if (isValid) router.push("/register/otp");
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
            error={error.name}
            value={formData.name}
            onChange={(text) => setFormData({ ...formData, name: text })}
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
              error={error.phone}
              value={formData.phone}
              onChange={(text) => setFormData({ ...formData, phone: text })}
            />
          </View>

          <CustomTextInput
            label={"Email Id"}
            value={formData.email}
            error={error.email}
            onChange={(text) => setFormData({ ...formData, email: text })}
          />
          <CustomTextInput
            label={"Password"}
            value={formData.password}
            error={error.password}
            secureTextEntry={!showPwd}
            onChange={(text) => setFormData({ ...formData, password: text })}
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
                icon={showConfirmPwd ? "eye-off" : "eye"} // Change icon based on showPassword state
                onPress={() => setShowConfirmPwd(!showConfirmPwd)} // Toggle show/hide
              />
            }
            value={formData.confirmPwd}
            error={error.confirmPwd}
            onChange={(text) => setFormData({ ...formData, confirmPwd: text })}
          />
        </View>
        <CustomButton text={"NEXT"} onPress={handleSubmit} />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default Step1;
const styles = StyleSheet.create({});
