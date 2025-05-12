import { StyleSheet, Text, View } from "react-native";
import { colors } from "../data/theme";
import { useMemo, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-paper";
import CustomTextInput from "./CustomTextInput";
const CustomSelect = ({
  options,
  label,
  value,
  onSelect,
  customStyle,
  scrollRef,
  search = false,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: colors.primary }]}>
          {label}
        </Text>
      );
    }
    return null;
  };
  const handleFocus = () => {
    setTimeout(() => {
      scrollRef.current.scrollTo({ y: 300, animated: true });
    }, 300);
  };
  const countryOptions = useMemo(() => options.map((c) => c), [options]);
  return (
    <View style={[styles.container, customStyle]}>
      {renderLabel()}
      {search && <CustomTextInput />}
      <Dropdown
        // dropdownPosition="top"
        autoScroll={false}
        style={[styles.dropdown, isFocus && { borderColor: colors.primary }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countryOptions}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? label : ""}
        value={value}
        onFocus={() => setIsFocus(true)}
        // onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onSelect(item.value);
          setIsFocus(false);
        }}
        flatListProps={{ keyboardShouldPersistTaps: "handled" }}
      />
    </View>
  );
};
export default CustomSelect;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 16,
    borderColor: "#8D8A8D",
  },
  dropdown: {
    height: 50,
    borderColor: "#8D8A8D",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
