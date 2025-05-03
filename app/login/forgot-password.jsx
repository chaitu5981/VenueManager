import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) setError("Enter valid Email");
    else {
      setError("");
      router.push("login/otp");
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
          onChange={(text) => setEmail(text)}
        />

        <CustomButton text={"Submit"} onPress={handleSubmit} />
      </ScreenWrapper>
    </View>
  );
};
export default ForgotPassword;
const styles = StyleSheet.create({});
