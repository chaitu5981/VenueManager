import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Typo from "./Typo";
const Stepper = ({ step }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        backgroundColor: "white",
      }}
    >
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <View key={i} style={{ alignItems: "center", width: "28%", gap: 5 }}>
            <View
              style={[
                styles.line,
                i + 1 <= step
                  ? { backgroundColor: "#FEB449" }
                  : { backgroundColor: "lightgray" },
              ]}
            ></View>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Ionicons
                name="checkmark-circle-sharp"
                size={24}
                color={i + 1 <= step ? "#54adc3" : "lightgray"}
              />
              <Typo size={10}>STEP {i + 1}</Typo>
            </View>
          </View>
        ))}
    </View>
  );
};
export default Stepper;
const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 2,
  },
});
