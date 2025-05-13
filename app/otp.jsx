import { StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import OTPForm from "../components/OTPForm";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp as verifyOtpApi } from "../store/authSlice";
import { resendOtp as resendOtpApi } from "../store/authSlice";
import { Toast } from "toastify-react-native";
import axios from "axios";
const OTP = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { email, userId, source } = useLocalSearchParams();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const otpRef = useRef(null);
  const [resendOtpLoading, setResendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const resendOtp = async (userId) => {
    try {
      setResendOtpLoading(true);
      const { data } = await axios.post(
        "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/resendOTP",
        { user_id: userId }
      );
      if (data.status_code == 200) Toast.success(data.message);
      else Toast.error(data.message);
    } catch (error) {
      Toast.error("Internal Error");
    } finally {
      setResendOtpLoading(false);
    }
  };
  const verifyOtp = async (otp, userId) => {
    if (otp.length == 6) {
      setError("");
      try {
        setVerifyOtpLoading(true);
        const { data } = await axios.post(
          "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/verifyOTP",
          { user_id: userId, otp }
        );
        if (data.status_code == 200) {
          Toast.success(data.message);
          if (source == "register") {
            router.dismissTo("/");
            router.replace({
              pathname: "/register/step2",
              userId,
            });
          } else {
            router.replace({
              pathname: "/login/update-password",
              params: {
                userId,
              },
            });
          }
        } else Toast.error(data.message);
      } catch (error) {
        console.log(error);
        Toast.error("Internal Error");
      } finally {
        setVerifyOtpLoading(false);
      }
      otpRef.current.clear();
    } else setError("OTP should contain 6 digits");
  };

  return (
    <ScreenWrapper>
      <OTPForm
        userId={userId}
        error={error}
        handleSubmit={verifyOtp}
        email={email}
        resendOtp={resendOtp}
        resendOtpLoading={resendOtpLoading}
        verifyOtpLoading={verifyOtpLoading}
        otpRef={otpRef}
      />
    </ScreenWrapper>
  );
};
export default OTP;
const styles = StyleSheet.create({});
