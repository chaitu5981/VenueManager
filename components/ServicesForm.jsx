import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Typo from "./Typo";
import CustomTextInput from "./CustomTextInput";
import { validateNumber, validateText } from "../utils/helper";
const ServicesForm = ({ services, setServices, errors, setErrors }) => {
  const addService = () => {
    let n = services.length;
    let id = n ? services[n - 1].id + 1 : 1;
    setServices([...services, { id, name: "", serviceCost: "" }]);
    setErrors({
      ...errors,
      services: [...errors.services, { id, name: "", serviceCost: "" }],
    });
  };
  const deleteService = (index) => {
    setServices((prev) => prev.filter((s, i) => s.id !== index));
    const newErrors = errors.services.filter((e, i) => e.id !== index);
    setErrors({ ...errors, services: newErrors });
  };
  const addServiceName = (v, index) => {
    const newServices = services.map((service) => {
      if (service.id === index)
        return {
          ...service,
          name: v,
        };
      else return { ...service };
    });
    const newErrors = errors.services.map((error, i) => {
      if (error.id == index)
        return {
          ...error,
          name: validateText(v, "Service Name"),
        };
      else return { ...error };
    });
    setServices(newServices);
    setErrors({ ...errors, services: newErrors });
  };
  const addServiceCost = (v, index) => {
    const newServices = services.map((service, i) => {
      if (service.id === index)
        return {
          ...service,
          serviceCost: v,
        };
      else return { ...service };
    });
    const newErrors = errors.services.map((error, i) => {
      if (error.id == index)
        return {
          ...error,
          serviceCost: validateNumber(v, "Service Charge"),
        };
      else return { ...error };
    });
    setServices(newServices);
    setErrors({ ...errors, services: newErrors });
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
          <View style={{ gap: 5 }} key={service.id}>
            <View
              style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
            >
              <CustomTextInput
                label={"Service Name"}
                value={service.name}
                customStyle={{ flexGrow: 1 }}
                onChange={(v) => {
                  addServiceName(v, service.id);
                }}
                error={errors.services[i].name}
              />
              <TouchableOpacity onPress={() => deleteService(service.id)}>
                <MaterialCommunityIcons
                  name="delete-circle"
                  size={40}
                  color="red"
                />
              </TouchableOpacity>
            </View>
            <CustomTextInput
              label={"Service Charge"}
              value={service.serviceCost}
              onChange={(v) => addServiceCost(v, service.id)}
              error={errors.services[i].serviceCost}
            />
          </View>
        ))}
    </View>
  );
};
export default ServicesForm;
const styles = StyleSheet.create({});
