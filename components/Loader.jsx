import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../data/theme";
const Loader = ({ size }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating color={colors.primary} size={size} />
    </View>
  );
};
export default Loader;
