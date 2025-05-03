import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Button = ({ text, textColor, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={{ color: textColor || "white", fontWeight: 800 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FEB449",
    width: "100%",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
  },
});
