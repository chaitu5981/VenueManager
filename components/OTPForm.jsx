import { StyleSheet, Text, View } from "react-native";
import { Button, HelperText } from "react-native-paper";
import Typo from "./Typo";
import { OtpInput } from "react-native-otp-entry";
import CustomButton from "./CustomButton";
import { useState } from "react";
const OTPForm = ({
  error,
  handleSubmit,
  email,
  userId,
  resendOtp,
  resendOtpLoading,
  verifyOtpLoading,
  otpRef,
}) => {
  const [otp, setOtp] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexGrow: 1, gap: 15, alignItems: "center" }}>
        <Typo size={20}>Enter OTP</Typo>
        <View>
          <Typo size={18} color={"gray"} style={{ textAlign: "center" }}>
            Kindly Enter the OTP sent to {email}
          </Typo>
          <Typo size={18} color={"gray"}></Typo>
        </View>
        <OtpInput
          ref={otpRef}
          numberOfDigits={6}
          focusColor={"black"}
          autoFocus
          type="numeric"
          onTextChange={(text) => setOtp(text)}
          theme={{
            containerStyle: styles.inputs,
            pinCodeContainerStyle: styles.input,
            pinCodeTextStyle: { fontSize: 18 },
          }}
        />
        <HelperText visible={!!error} type="error">
          {error}
        </HelperText>
        <View style={styles.resendOtp}>
          <Typo weight={800}>Didn't get OTP?</Typo>
          <Button
            mode={"text"}
            onPress={() => resendOtp(userId)}
            loading={resendOtpLoading}
          >
            Resend OTP
          </Button>
        </View>
      </View>
      <CustomButton
        text={"Submit"}
        onPress={() => {
          handleSubmit(otp, userId);
          setOtp("");
        }}
        loading={verifyOtpLoading}
      />
    </View>
  );
};
export default OTPForm;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },

  inputs: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },
  input: {
    width: 40,
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "lightgray",
  },
  resendOtp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
