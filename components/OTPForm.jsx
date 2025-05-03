import { StyleSheet, Text, View } from "react-native";
import { HelperText } from "react-native-paper";
import Typo from "./Typo";
import { OtpInput } from "react-native-otp-entry";
import CustomButton from "./CustomButton";
import { useState } from "react";
const OTPForm = ({ error, handleSubmit }) => {
  const [otp, setOtp] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexGrow: 1, gap: 15, alignItems: "center" }}>
        <Typo size={20}>Enter OTP</Typo>
        <View>
          <Typo size={18} color={"gray"}>
            Kindly Enter the OTP sent to
          </Typo>
          <Typo size={18} color={"gray"}></Typo>
        </View>
        <OtpInput
          numberOfDigits={4}
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
      </View>
      <CustomButton text={"Submit"} onPress={() => handleSubmit(otp)} />
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
});
