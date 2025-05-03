import { StyleSheet, Text, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
const CustomTextInput = ({
  label,
  error,
  value,
  onChange,
  customStyle,
  inputStyle,
  ...inputProps
}) => {
  return (
    <View style={customStyle}>
      <TextInput
        style={inputStyle}
        label={label}
        error={!!error}
        mode="outlined"
        value={value}
        onChangeText={onChange}
        {...inputProps}
      />
      {error && (
        <HelperText visible={!!error} type="error">
          {error}
        </HelperText>
      )}
    </View>
  );
};
export default CustomTextInput;
const styles = StyleSheet.create({});
