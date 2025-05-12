import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { TextInput } from "react-native-paper";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
const updatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const validatePwd = (v) =>
    v.length < 6 ? "Password Should be at least 6 Characters" : "";
  const validateConfirmPwd = (v) => {
    if (v.length < 6) return "Password Should be at least 6 Characters";
    else if (v !== password)
      return "Password and Confirm Password Should Match";
    else return "";
  };
  const handleSubmit = async () => {
    const pwdErr = validatePwd(password);
    const confirmPwdErr = validateConfirmPwd(confirmPassword);
    setErrors({
      password: pwdErr,
      confirmPassword: confirmPwdErr,
    });
    if (!pwdErr && !confirmPwdErr) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/updatePassword",
          { user_id: userId, password }
        );
        if (data.status_code == 200) {
          Toast.success(data.message);
          router.dismiss(2);
          router.push("/login");
        }
        if (data.status_code == 400) Toast.error(data.message);
      } catch (error) {
        console.log(error);
        Toast.error("Internal Error");
      } finally {
        setLoading(false);
        setPassword("");
        setConfirmPassword("");
      }
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header showBackBtn />
      <ScreenWrapper>
        <View>
          <Typo style={{ textAlign: "center" }} size={20} weight={800}>
            Update Password
          </Typo>
          <Typo style={{ textAlign: "center" }}>Add Below Details</Typo>
        </View>
        <CustomTextInput
          label={"Password"}
          value={password}
          error={errors.password}
          onChange={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: validatePwd(text) });
          }}
          secureTextEntry={!showPwd}
          right={
            <TextInput.Icon
              icon={showPwd ? "eye-off" : "eye"}
              onPress={() => setShowPwd(!showPwd)}
            />
          }
        />
        <CustomTextInput
          label={"Confirm Password"}
          value={confirmPassword}
          secureTextEntry={!showConfirmPwd}
          error={errors.confirmPassword}
          onChange={(text) => {
            setConfirmPassword(text);
            setErrors({ ...errors, confirmPassword: validateConfirmPwd(text) });
          }}
          right={
            <TextInput.Icon
              icon={showPwd ? "eye-off" : "eye"}
              onPress={() => setShowConfirmPwd(!showConfirmPwd)}
            />
          }
        />

        <CustomButton
          text={"Submit"}
          onPress={handleSubmit}
          loading={loading}
        />
      </ScreenWrapper>
    </View>
  );
};
export default updatePassword;
const styles = StyleSheet.create({});
