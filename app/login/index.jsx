import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import Typo from "../../components/Typo";
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { Toast } from "toastify-react-native";
const index = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const validateEmail = (v) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(v)) return "Enter Valid Email";
    else return "";
  };

  const validatePassword = (v) => {
    if (v.length < 6) return "Password Should be at least 6 Characters";
    else return "";
  };
  const handleSubmit = async () => {
    const emailErr = validateEmail(formData.email);
    const passwordErr = validatePassword(formData.password);
    setErrors({ email: emailErr, password: passwordErr });

    if (!emailErr && !passwordErr) {
      const result = await dispatch(
        loginUser({ username: formData.email, password: formData.password })
      );
      if (loginUser.fulfilled.match(result)) {
        const res = result.payload;
        if (res.status_code == 200) {
          Toast.success("User logged in Successfully");
          router.dismissTo("/");
          router.replace("tabs");
        } else {
          Toast.error(res.message);
          if (res.pending == "venue") {
            router.dismissTo("/");
            router.replace({
              pathname: "/register/step2",
              params: {
                userId: res.pendingdata.user_id,
              },
            });
          }
          if (res.pending == "subvenue") {
            router.dismissTo("/");
            router.replace({
              pathname: "/register/step3",
              params: {
                userId: res.pendingdata.user_id,
                venueId: res.pendingdata.venue_id,
              },
            });
          }
        }
      }
      if (loginUser.rejected.match(result)) {
        Toast.error(result.payload);
        setFormData({
          email: "",
          password: "",
        });
      }
    }
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
          error={errors.email}
          onChange={(text) => {
            setFormData({ ...formData, email: text });
            setErrors({ ...errors, email: validateEmail(text) });
          }}
        />
        <CustomTextInput
          label={"Password"}
          value={formData.password}
          error={errors.password}
          secureTextEntry={!showPwd}
          onChange={(text) => {
            setFormData({ ...formData, password: text });
            setErrors({ ...errors, password: validatePassword(text) });
          }}
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
        <CustomButton
          text={"Login"}
          onPress={handleSubmit}
          loading={authState.loading}
        />
      </ScreenWrapper>
    </View>
  );
};
export default index;
const styles = StyleSheet.create({});
