import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Typo from "../../components/Typo";
import { useState } from "react";
import { colors } from "../../data/theme";
const stars = Array.from({ length: 5 });
const RateUS = () => {
  const [rating, setRating] = useState(1);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label={"Rate Us"} showBackBtn />
      <ScreenWrapper>
        <Image source={require("../../assets/rate-us.png")} />
        <Typo position={"center"} weight={600}>
          How do you rate this Application?
        </Typo>
        <View style={styles.stars}>
          {stars.map((star, i) => (
            <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
              {i + 1 <= rating ? (
                <FontAwesome name="star" size={40} color={colors.primary} />
              ) : (
                <FontAwesome name="star-o" size={40} color="gray" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default RateUS;
const styles = StyleSheet.create({
  stars: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: "auto",
  },
});
