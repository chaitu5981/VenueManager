import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IconButton, RadioButton } from "react-native-paper";
import CustomTextInput from "./CustomTextInput";
import Typo from "./Typo";
import CustomSelect from "./CustomSelect";
import { subVenueStatus } from "../data/constants";
import { SafeAreaView } from "react-native-safe-area-context";
const SubVenueForm = ({
  onDelete,
  index,
  item,
  validateName,
  validateCapacity,
  onChange,
  errors,
}) => {
  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.subVenueContainer}>
      <IconButton
        style={{
          marginLeft: "auto",
          marginVertical: 0,
          marginRight: 0,
        }}
        icon="close"
        size={30}
        iconColor="#59B0C1"
        onPress={onDelete}
      />
      <View style={{ gap: 8 }}>
        <Typo size={16}>Choose Sub Venue Type</Typo>
        <RadioButton.Group
          onValueChange={(value) => onChange("type", value, index)}
          value={item.type}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="Hall" />
              <Text>Hall</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="Lawn" />
              <Text>Lawn</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="Others" />
              <Text>Others</Text>
            </View>
          </View>
        </RadioButton.Group>
        <CustomTextInput
          label={`${capitalize(item.type)} Name`}
          value={item.name}
          error={errors.name}
          onChange={(v) => onChange("name", v, index, validateName)}
        />
        <CustomTextInput
          label={"Capacity"}
          keyboardType="numeric"
          value={item.capacity}
          error={errors.capacity}
          onChange={(v) => onChange("capacity", v, index, validateCapacity)}
        />
        <CustomSelect
          label={"Status"}
          value={item.status}
          onSelect={(v) => onChange("status", v, index)}
          options={subVenueStatus}
        />
      </View>
    </View>
  );
};
export default SubVenueForm;
const styles = StyleSheet.create({
  subVenueContainer: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 10,
  },
});
