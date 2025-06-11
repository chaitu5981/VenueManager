import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "./CustomTextInput";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { validatePhone, validateText } from "../utils/helper";
import { useEffect } from "react";
const PersonsForm = ({
  accommodation,
  setAccommodation,
  errors,
  setErrors,
}) => {
  const addPerson = () => {
    let n = accommodation.persons.length;
    let id = n ? accommodation.persons[n - 1].id + 1 : 1;
    setAccommodation({
      ...accommodation,
      persons: [...accommodation.persons, { id, name: "", phone: "" }],
    });
    setErrors({
      ...errors,
      persons: [...errors.persons, { id, name: "", phone: "" }],
    });
  };
  const deletePerson = (index) => {
    setAccommodation({
      ...accommodation,
      persons: accommodation.persons.filter((p) => p.id !== index),
    });
    const newErrors = errors.persons.filter((e) => e.id !== index);
    setErrors({ ...errors, persons: newErrors });
  };
  const addPersonName = (v, id) => {
    const newPersons = accommodation.persons.map((person) => {
      if (person.id === id)
        return {
          ...person,
          name: v,
        };
      else return { ...person };
    });
    const newErrors = errors.persons.map((error) => {
      if (error.id == id)
        return {
          ...error,
          name: validateText(v, "Name"),
        };
      else return { ...error };
    });
    setAccommodation({ ...accommodation, persons: newPersons });
    setErrors({ ...errors, persons: newErrors });
  };
  const addPersonPhone = (v, index) => {
    const newPersons = accommodation.persons.map((person, i) => {
      if (person.id === index)
        return {
          ...person,
          phone: v,
        };
      else return { ...person };
    });
    const newErrors = errors.persons.map((error, i) => {
      if (error.id == index)
        return {
          ...error,
          phone: validatePhone(v, "Phone No"),
        };
      else return { ...error };
    });
    setAccommodation({ ...accommodation, persons: newPersons });
    setErrors({ ...errors, persons: newErrors });
  };
  useEffect(() => {
    setAccommodation({ ...accommodation, noOfRooms: "" });
  }, []);
  return (
    <View style={{ gap: 10 }}>
      {/* <CustomTextInput
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
      /> */}
      <TouchableOpacity onPress={addPerson} style={{ alignSelf: "flex-end" }}>
        <Ionicons name="add-circle" size={40} color="blue" />
      </TouchableOpacity>
      {accommodation.persons.length > 0 &&
        accommodation.persons.map((person, i) => (
          <View key={person.id} style={{ gap: 7 }}>
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
                  onChange={(v) => addPersonName(v, person.id)}
                  error={errors.persons[i].name}
                />
                <TouchableOpacity onPress={() => deletePerson(person.id)}>
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
              value={person.phone}
              onChange={(v) => addPersonPhone(v, person.id)}
              error={errors.persons[i].phone}
            />
          </View>
        ))}
    </View>
  );
};
export default PersonsForm;
const styles = StyleSheet.create({});
