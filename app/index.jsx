import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { colors } from "../data/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import Typo from "../components/Typo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsInfo, getUserInfo, setUser } from "../store/userSlice";
import { fetchCountries } from "../store/locationSlice";
const carouselItems = [
  require("../assets/Intro1.png"),
  require("../assets/Intro2.png"),
  require("../assets/Intro3.png"),
  require("../assets/Intro4.png"),
  require("../assets/Intro5.png"),
  require("../assets/Intro6.png"),
];
const { width, height } = Dimensions.get("window");

const CarouselImage = memo(({ source }) => (
  <Image source={source} style={{ width, height, resizeMode: "cover" }} />
));
const renderItem = ({ item }) => (
  <View style={{ flex: 1 }}>
    <CarouselImage source={item} />
  </View>
);

const Index = () => {
  const progress = useSharedValue(0);
  const router = useRouter();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const handleNext = () => {
    const currentIndex = Math.round(progress.value);
    if (currentIndex < 5)
      ref.current?.scrollTo({ index: currentIndex + 1, animated: true });
    else router.replace("index1");
  };
  const [showSplash, setShowSplash] = useState(true);
  const fetchUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    // await AsyncStorage.removeItem("userId");
    return userId;
  };
  const fetchUserInfo = async (userId) => {
    const res1 = await dispatch(getUserInfo(userId));
    const res2 = await dispatch(getRoomsInfo(userId));
    if (res1.meta.requestStatus == "fulfilled") {
      router.dismissAll();
      router.replace("/tabs");
    } else setShowSplash(false);
  };
  useEffect(() => {
    const checkUser = async () => {
      const userId = await fetchUserId();
      if (userId) {
        fetchUserInfo(userId);
      } else
        setTimeout(() => {
          setShowSplash(false);
        }, 2000);
    };
    checkUser();
    dispatch(fetchCountries());
  }, []);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {showSplash ? (
        <Image
          source={require("../assets/splash.png")}
          style={{ height: "100%", width: "100%" }}
        />
      ) : (
        <View style={{ flex: 1, width: "100%" }}>
          <Carousel
            ref={ref}
            width={width}
            height={height}
            loop={false}
            onProgressChange={progress}
            data={carouselItems}
            renderItem={renderItem}
            scrollAnimationDuration={300}
            mode="normal"
          />
          <View style={styles.buttons}>
            <Pagination.Custom
              progress={progress}
              data={carouselItems}
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.activeDotStyle}
              containerStyle={{ gap: 6 }}
            />
          </View>
          <TouchableOpacity
            style={styles.nextBtnContainer}
            onPress={handleNext}
          >
            <View style={styles.nextBtn}>
              <FontAwesome6 name="arrow-right-long" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => router.replace("index1")}
          >
            <Typo size={20}>Skip</Typo>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Index;
const styles = StyleSheet.create({
  buttons: {
    position: "absolute",
    left: 50,
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nextBtnContainer: {
    position: "absolute",
    bottom: 45,
    right: 50,
  },
  dotStyle: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  activeDotStyle: {
    width: 35,
    height: 13,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: colors.secondary,
  },
  nextBtn: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  skipBtn: {
    position: "absolute",
    top: 50,
    right: 50,
  },
});
