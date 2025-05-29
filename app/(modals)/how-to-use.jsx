import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
const HowToUse = () => {
  const player = useVideoPlayer(
    "https://www.w3schools.com/html/mov_bbb.mp4",
    (player) => {
      player.pause();
    }
  );
  const isPlaying = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label={"How To Use"} showBackBtn />
      <ScreenWrapper>
        <View style={{ paddingHorizontal: 30 }}>
          <VideoView player={player} style={{ width: "100%", height: 300 }} />
        </View>
      </ScreenWrapper>
    </SafeAreaView>
  );
};
export default HowToUse;
const styles = StyleSheet.create({});
