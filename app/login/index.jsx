import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import Typo from "../../components/Typo";
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
const index = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();
  const handleSubmit = () => {
    const newErrors = {
      email: "",
      password: "",
    };
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(formData?.email)) {
      newErrors.email = "Please enter valid Email";
      isValid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
      isValid = false;
    }
    setError(newErrors);
    if (isValid) router.push("login/otp");
  };
  return (
    <View style={{ flex: 1 }}>
      <Header showBackBtn />
      <ScreenWrapper>
        <View>
          <Typo style={{ textAlign: "center" }} size={20} weight={800}>
            Log in
          </Typo>
          <Typo style={{ textAlign: "center" }}>Add Below Details</Typo>
        </View>
        <CustomTextInput
          label={"Email"}
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
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => router.push("login/forgot-password")}
        >
          <Typo weight={800}>Forgot Password?</Typo>
        </TouchableOpacity>
        <CustomButton text={"Login"} onPress={handleSubmit} />
      </ScreenWrapper>
    </View>
  );
};
export default index;
const styles = StyleSheet.create({});
