import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, HelperText } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomTextInput from "./CustomTextInput";

const TimePicker = ({ label, value, onConfirm, error }) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  return (
    <View>
      <Pressable onPress={() => setShowTimePicker(true)}>
        <CustomTextInput label={label} value={value} editable={false} />
      </Pressable>
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={(v) => {
          onConfirm(v);

          setShowTimePicker(false);
        }}
        onCancel={() => setShowTimePicker(false)}
      />
    </View>
  );
};
export default TimePicker;
const styles = StyleSheet.create({});
