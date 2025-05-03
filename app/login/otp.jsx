import { StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import OTPForm from "../../components/OTPForm";
const OTP = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = (otp) => {
    if (otp.length == 4) {
      setError("");
      router.dismissAll();
      router.dismiss();
      router.replace("/tabs");
    } else setError("OTP should contain 4 digits");
  };
  return (
    <ScreenWrapper>
      <OTPForm error={error} handleSubmit={handleSubmit} />
    </ScreenWrapper>
  );
};
export default OTP;
const styles = StyleSheet.create({});
