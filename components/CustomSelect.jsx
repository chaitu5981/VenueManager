import { StyleSheet, Text, View } from "react-native";
import { HelperText } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
const CustomSelect = ({ error, ...props }) => {
  return (
    <View>
      <Dropdown
        hideMenuHeader
        error={!!error}
        {...props}
        mode="outlined"
        menuContentStyle={{ backgroundColor: "white" }}
      />
      {error && (
        <HelperText visible={!!error} type="error">
          {error}
        </HelperText>
      )}
    </View>
  );
};
export default CustomSelect;
const styles = StyleSheet.create({});
