import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { Toast } from "toastify-react-native";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validateEmail = (v) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(v)) return "Enter valid Email";
    else return "";
  };
  const handleSubmit = async () => {
    const err = validateEmail(email);
    setError(err);
    if (!err) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/customerforgotpassword",
          { email }
        );
        if (data.status_code == 200) {
          router.push({
            pathname: "/otp",
            params: { email, userId: data.user_id, source: "forgot-password" },
          });
          Toast.success(data.message);
        }
        if (data.status_code == 400) Toast.error(data.message);
      } catch (error) {
        Toast.error("Internal Error");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header showBackBtn />
      <ScreenWrapper>
        <View>
          <Typo style={{ textAlign: "center" }} size={20} weight={800}>
            Forgot Password
          </Typo>
          <Typo style={{ textAlign: "center" }}>Add Below Details</Typo>
        </View>
        <CustomTextInput
          label={"Email"}
          value={email}
          error={error}
          onChange={(text) => {
            setEmail(text);
            setError(validateEmail(text));
          }}
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
export default ForgotPassword;
const styles = StyleSheet.create({});
