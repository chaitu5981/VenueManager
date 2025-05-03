import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import Stepper from "../../components/Stepper";
import Typo from "../../components/Typo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import SubVenueForm from "../../components/SubVenueForm";
import { useRouter } from "expo-router";
import Header from "../../components/Header";

const Step3 = () => {
  const [subVenues, setSubVenues] = useState([]);
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const addSubVenue = () => {
    setSubVenues((prev) => [...prev, { type: "hall", name: "", capacity: "" }]);
    setErrors((prev) => [...prev, { name: "", capacity: "" }]);
  };

  const deleteSubVenue = (index) => {
    setSubVenues((prev) => prev.filter((sub, i) => i !== index));
    setErrors((prev) => prev.filter((sub, i) => i !== index));
  };

  const handleSubmit = () => {
    let isError = false;
    subVenues.forEach((subVenue, index) => {
      const newErrors = { name: "", capacity: "" };
      let isValid = true;
      if (!subVenue.name.trim()) {
        newErrors.name = "Please enter valid name";
        isValid = false;
      }
      if (isNaN(Number(subVenue.capacity)) || Number(subVenue.capacity) <= 0) {
        newErrors.capacity = "Please enter valid capacity";
        isValid = false;
      }
      setErrors((prev) =>
        prev.map((errs, i) => {
          if (i == index) return { ...newErrors };
          else return errs;
        })
      );
      if (!isValid) isError = true;
    });
    if (!isError) {
      router.push("register/success");
    }
  };
  const setSubVenueData = (field, value, index) => {
    const newSubVenues = subVenues.map((subVenue, i) => {
      if (i == index) return { ...subVenue, [field]: value };
      else return subVenue;
    });
    setSubVenues(newSubVenues);
  };
  return (
    <View style={{ flexGrow: 1 }}>
      <Header showBackBtn />
      <Stepper step={3} />
      <ScreenWrapper>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Typo size={20}>Add Sub Venue</Typo>
            <Typo size={12} color={"gray"}>
              Enter available Halls/Lawns in your venue
            </Typo>
          </View>
          <TouchableOpacity onPress={addSubVenue}>
            <AntDesign name="pluscircle" size={40} color="#223382" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={subVenues}
          contentContainerStyle={{ flexGrow: 1 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <SubVenueForm
              item={item}
              index={index}
              errors={errors[index]}
              onDelete={() => deleteSubVenue(index)}
              onChange={setSubVenueData}
            />
          )}
        />
        <CustomButton text={"Submit"} onPress={handleSubmit} />
      </ScreenWrapper>
    </View>
  );
};
export default Step3;
const styles = StyleSheet.create({});
