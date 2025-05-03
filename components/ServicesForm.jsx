import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Typo from "./Typo";
import CustomTextInput from "./CustomTextInput";
const ServicesForm = ({ services, setServices, errors, setErrors }) => {
  const addService = () => {
    setServices([...services, { name: "", serviceCost: 0 }]);
    setErrors({
      ...errors,
      services: [...errors.services, { name: "", serviceCost: "" }],
    });
  };
  const deleteService = (index) => {
    setServices(services.filter((s, i) => i !== index));
    const newErrors = errors.services.filter((_, i) => i !== index);
    setErrors({ ...errors, services: newErrors });
  };
  const addServiceName = (v, index) => {
    const newServices = services.map((service, i) => {
      if (i === index)
        return {
          ...service,
          name: v,
        };
      else return { ...service };
    });
    setServices(newServices);
  };
  const addServiceCost = (v, index) => {
    const newServices = services.map((service, i) => {
      if (i === index)
        return {
          ...service,
          serviceCost: Number(v),
        };
      else return { ...service };
    });
    setServices(newServices);
  };
  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            gap: 3,
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <RadioButton status="checked" />
          <Typo>Service Type (optional)</Typo>
        </View>
        <TouchableOpacity onPress={addService}>
          <Ionicons name="add-circle" size={40} color="blue" />
        </TouchableOpacity>
      </View>
      {services.length > 0 &&
        services.map((service, i) => (
          <View style={{ gap: 5 }} key={i}>
            <View
              style={{ flexDirection: "row", gap: 3, alignItems: "flex-start" }}
            >
              <CustomTextInput
                label={"Service Name"}
                value={service.name}
                customStyle={{ flexGrow: 1 }}
                onChange={(v) => addServiceName(v, i)}
                error={errors.services[i].name}
              />
              <TouchableOpacity onPress={() => deleteService(i)}>
                <MaterialCommunityIcons
                  name="delete-circle"
                  size={40}
                  color="red"
                />
              </TouchableOpacity>
            </View>
            <CustomTextInput
              label={"Service Charge"}
              value={service.serviceCost.toString()}
              onChange={(v) => addServiceCost(v, i)}
              error={errors.services[i].serviceCost}
            />
          </View>
        ))}
    </View>
  );
};
export default ServicesForm;
const styles = StyleSheet.create({});
