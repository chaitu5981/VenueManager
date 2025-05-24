import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import Typo from "../../components/Typo";
import CustomTextInput from "../../components/CustomTextInput";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, loginUser } from "../../store/userSlice";
import { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
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
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/login`,
          { username: formData.email, password: formData.password }
        );
        if (data.status_code == 200) {
          await AsyncStorage.setItem("userId", data.user_id);
          const res = await dispatch(getUserInfo(data.user_id));
          if (res.payload.status_code == 200) {
            router.dismissAll();
            router.replace("/tabs");
            Toast.success("User logged in Successfully");
          }
        } else {
          Toast.warn(data.message);
          const userId = data.pending.user_id;
          if (
            data.pending == "otp" ||
            data.pending == "venue" ||
            data.pending == "subvenue"
          ) {
            Alert.alert("Alert", data.message, [
              {
                text: "Cancel",
                style: "cancel",
                onPress: () => console.log("Cancel"),
              },
              {
                text: "Confirm",
                style: "default",
                onPress: () => {
                  if (data.pending == "otp")
                    router.replace({
                      pathname: "/otp",
                      params: {
                        userId,
                        email: formData.email,
                        source: "register",
                      },
                    });
                  if (data.pending == "venue")
                    router.replace({
                      pathname: "/register/step2",
                      params: {
                        userId,
                      },
                    });
                  if (data.pending == "subvenue")
                    router.replace({
                      pathname: "/register/step3",
                      params: {
                        userId,
                        venueId: data.pendingdata.venue_id,
                      },
                    });
                },
              },
            ]);
          }
        }
      } catch (error) {
        console.log(error);
        Toast.error("Internal Error");
      } finally {
        setLoading(false);
        setFormData({
          email: "",
          password: "",
        });
      }
    }
  };
  const setUser = async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  };
  useEffect(() => {
    if (userState.user) setUser(userState.user);
  }, [userState]);
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
          loading={loading || userState.loading}
        />
      </ScreenWrapper>
    </View>
  );
};
export default index;
const styles = StyleSheet.create({});
