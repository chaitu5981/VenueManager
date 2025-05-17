import { Animated, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Typo from "../../components/Typo";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
const Success = () => {
  const scale = new Animated.Value(0);
  const width = new Animated.Value(0);
  const router = useRouter();
  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(width, {
      toValue: 100,
      duration: 500,
      delay: 400,
    }).start();
  }, []);
  return (
    <ScreenWrapper>
      <View
        style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
          <Animated.View
            style={{
              overflow: "hidden",
              width,
              justifyContent: "center",
              position: "absolute",
              left: 25,
            }}
          >
            <MaterialCommunityIcons
              name="check-bold"
              size={100}
              color="white"
            />
          </Animated.View>
        </Animated.View>
      </View>
      <View style={{ gap: 20 }}>
        <Typo size={19} position={"center"}>
          Congratulations, Your Venue has been created successfully
        </Typo>
        <CustomButton
          text={"Continue"}
          onPress={() => {
            router.dismissAll();
            router.replace("/login");
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
export default Success;
const styles = StyleSheet.create({
  circle: {
    width: 150,
    height: 150,
    backgroundColor: "#00C1A4",
    borderRadius: 100,
    justifyContent: "center",
  },
});
