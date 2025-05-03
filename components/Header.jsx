import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Typo from "./Typo";
import { useRouter } from "expo-router";

const Header = ({ label, showBackBtn }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {showBackBtn && (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      )}
      <View style={{ flexGrow: 1, alignItems: "center" }}>
        <Typo size={20} weight={800}>
          {label}
        </Typo>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
});
