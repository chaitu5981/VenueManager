import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { colors } from "../../data/theme";
import { RadioButton } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import Line from "../../components/Line";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { subscriptionTypes } from "../../data/constants";
import { Toast } from "toastify-react-native";
import RazorpayCheckout from "react-native-razorpay";
const Subscription = () => {
  const [plan, setPlan] = useState(subscriptionTypes[0]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user);
  console.log(user);
  const makePayment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/payment/createOrder`,
        { user_id: user.user_id, plan_name: plan.type, amount: plan.charge }
      );
      if (data.status_code == 200) {
        console.log(data);
        const options = {
          key: "rzp_test_Dxfv0usmma0Jzv",
          amount: String(data.amount_due),
          currency: data.currency,
          name: user.name,
          order_id: data.id,
        };
        RazorpayCheckout.open(options)
          .then((data) => {
            Alert.alert("Success: ", data.razorpay_payment_id);
          })
          .catch((error) => {
            console.log(error.description);
          });
      }
    } catch (error) {
      console.log(error);
      Toast.error("Internal Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label={"Subscription"} showBackBtn />
      <ScreenWrapper>
        <View style={{ flex: 1 }}>
          <Typo position={"center"}>Find your perfect plan</Typo>
          <View style={styles.container}>
            <Typo color={colors.secondary} size={17} weight={800}>
              Premium Plan
            </Typo>
            <RadioButton.Group value={plan} onValueChange={(v) => setPlan(v)}>
              {subscriptionTypes.map((type) => (
                <RadioButton.Item
                  key={type.type}
                  value={type}
                  label={`₹${type.charge}/${type.type.slice(
                    0,
                    type.type.length - 2
                  )}`}
                />
              ))}
            </RadioButton.Group>
            <Line />
            <View style={{ flexDirection: "row", gap: 5 }}>
              <AntDesign name="checkcircle" size={24} color="green" />
              <Typo>Download the records</Typo>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <AntDesign name="checkcircle" size={24} color="green" />
              <Typo>Update the Business Logo</Typo>
            </View>
          </View>
        </View>
        <CustomButton
          text="Make Payment"
          onPress={makePayment}
          loading={loading}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default Subscription;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    gap: 15,
  },
});
