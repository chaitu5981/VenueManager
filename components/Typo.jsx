import { View, Text } from "react-native";
const Typo = ({ size, weight, color, position, children, style }) => {
  return (
    <Text
      style={[
        {
          fontSize: size,
          fontWeight: weight || 400,
          color: color,
          textAlign: position,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
export default Typo;
