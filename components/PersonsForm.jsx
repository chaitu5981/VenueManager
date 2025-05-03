import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "./CustomTextInput";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import Typo from "./Typo";
const PersonsForm = ({
  accommodation,
  setAccommodation,
  errors,
  setErrors,
}) => {
  const setPersonName = (v, index) => {
    const newList = accommodation.persons.list.map((person, i) => {
      if (i === index)
        return {
          ...person,
          name: v,
        };
      else return { ...person };
    });
    setAccommodation({
      ...accommodation,
      persons: { ...accommodation.persons, list: newList },
    });
  };
  const setPersonContact = (v, index) => {
    const newList = accommodation.persons.list.map((person, i) => {
      if (i === index)
        return {
          ...person,
          contactNo: v,
        };
      else return { ...person };
    });
    setAccommodation({
      ...accommodation,
      persons: { ...accommodation.persons, list: newList },
    });
  };
  const addPerson = () => {
    if (accommodation.persons.list.length < accommodation.persons.noOfPersons) {
      setAccommodation({
        ...accommodation,
        persons: {
          ...accommodation.persons,
          list: [...accommodation.persons.list, { name: "", contactNo: "" }],
        },
      });
      setErrors({
        ...errors,
        persons: [...errors.persons, { name: "", contactNo: "" }],
      });
    }
  };
  const deletePerson = (index) => {
    if (accommodation.persons.list.length > accommodation.persons.noOfPersons) {
      const newList = accommodation.persons.list.filter(
        (room, i) => i !== index
      );
      const newErrors = errors.persons.filter((_, i) => i !== index);
      setAccommodation({
        ...accommodation,
        persons: { ...accommodation.persons, list: newList },
      });
      setErrors({ ...errors, persons: newErrors });
    }
  };
  return (
    <View style={{ gap: 10 }}>
      <CustomTextInput
        label={"No Of Persons"}
        value={accommodation.persons.noOfPersons.toString()}
        onChange={(v) => {
          setAccommodation({
            ...accommodation,
            persons: { ...accommodation.persons, noOfPersons: Number(v) },
          });
        }}
        error={errors.noOfPersons}
      />
      <CustomTextInput
        label={"Cost per Person"}
        value={accommodation.persons.personCost.toString()}
        onChange={(v) =>
          setAccommodation({
            ...accommodation,
            persons: { ...accommodation.persons, personCost: Number(v) },
          })
        }
        error={errors.personCost}
      />
      <CustomTextInput
        label={"Total Persons Cost"}
        value={(
          accommodation.persons.noOfPersons * accommodation.persons.personCost
        ).toString()}
        editable={false}
      />
      {accommodation.persons.list.map((person, i) => (
        <View key={i} style={{ gap: 7 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Typo style={{ flexGrow: 1 }}>Enter Person {i + 1} Details</Typo>
            {i == 0 && (
              <TouchableOpacity onPress={addPerson}>
                <Ionicons name="add-circle" size={40} color="blue" />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <CustomTextInput
                customStyle={{ flexGrow: 1 }}
                label={"Name"}
                value={person.name}
                onChange={(v) => setPersonName(v, i)}
                error={errors.persons[i].name}
              />
              <TouchableOpacity onPress={() => deletePerson(i)}>
                <MaterialCommunityIcons
                  name="delete-circle"
                  size={40}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </View>
          <CustomTextInput
            label={"Contact No"}
            value={person.contactNo}
            onChange={(v) => setPersonContact(v, i)}
            error={errors.persons[i].contactNo}
          />
        </View>
      ))}
    </View>
  );
};
export default PersonsForm;
const styles = StyleSheet.create({});
