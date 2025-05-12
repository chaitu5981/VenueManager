import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../data/theme";
const CustomButton = ({ text, onPress, mode, loading }) => {
  return (
    <Button
      loading={loading}
      mode={mode || "contained"}
      style={{
        backgroundColor: colors.primary,
        borderRadius: 15,
        height: 60,
        justifyContent: "center",
      }}
      labelStyle={{ fontSize: 20 }}
      onPress={onPress}
    >
      {text}
    </Button>
  );
};
export default CustomButton;
const styles = StyleSheet.create({});
