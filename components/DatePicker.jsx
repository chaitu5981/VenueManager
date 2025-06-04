import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Typo from "./Typo";
// import Modal from "react-native-modal";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { formatDate } from "../utils/helper";
const DatePicker = ({ eventDates, onChange }) => {
  // const selectedDates = eventDates.map((d) => formatDate(d));
  const [markedDates, setMarkedDates] = useState([]);

  const [showPicker, setShowPicker] = useState(false);
  const addMarkedDate = (day) => {
    const date = day.dateString;
    let newDates;
    if (markedDates.includes(date))
      newDates = markedDates.filter((d) => d != date);
    else {
      newDates = [...markedDates, date];
      newDates.sort((a, b) => new Date(a) - new Date(b));
    }
    setMarkedDates(newDates);
  };
  const getSelectedDates = () => {
    return eventDates.join(",");
  };
  const getMarkedDates = () => {
    let marked = {};
    markedDates.forEach((d) => {
      marked[d] = { selected: true };
    });
    return marked;
  };
  const cancelSelDates = () => {
    setMarkedDates([...selectedDates]);
    setShowPicker(false);
  };
  return (
    <View style={styles.dateContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text>{getSelectedDates() || "Select Event Dates"}</Text>
      </ScrollView>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={35}
          color="black"
        />
      </TouchableOpacity>
      <Modal
        visible={showPicker}
        onRequestClose={() => setShowPicker(false)}
        transparent
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={cancelSelDates}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Calendar
                onDayPress={(day) => addMarkedDate(day)}
                markedDates={getMarkedDates()}
              />
              <View
                style={{ flexDirection: "row", gap: 20, alignSelf: "flex-end" }}
              >
                <Button mode="text" onPress={cancelSelDates}>
                  Cancel
                </Button>
                <Button
                  mode="text"
                  onPress={() => {
                    onChange(markedDates);
                    setShowPicker(false);
                  }}
                >
                  OK
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
export default DatePicker;
const styles = StyleSheet.create({
  dateContainer: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 5,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#C0BDC0",
    backgroundColor: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    // maxHeight: "70%",
    backgroundColor: "white",
    width: "70%",
    padding: 15,
    borderRadius: 10,
  },
});
