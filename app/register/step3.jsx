import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Stepper from "../../components/Stepper";
import Typo from "../../components/Typo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import SubVenueForm from "../../components/SubVenueForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "../../components/Header";
import { Toast } from "toastify-react-native";
import axios from "axios";

const Step3 = () => {
  const [subVenues, setSubVenues] = useState([
    { type: "hall", name: "", capacity: "", status: "Active" },
  ]);
  const [errors, setErrors] = useState([{ name: "", capacity: "" }]);
  const [loading, setLoading] = useState(false);
  const { userId, venueId } = useLocalSearchParams();
  const router = useRouter();
  const addSubVenue = () => {
    setSubVenues((prev) => [
      ...prev,
      { type: "hall", name: "", capacity: "", status: "Active" },
    ]);
    setErrors((prev) => [...prev, { name: "", capacity: "" }]);
  };

  const deleteSubVenue = (index) => {
    if (subVenues.length > 1) {
      setSubVenues((prev) => prev.filter((sub, i) => i !== index));
      setErrors((prev) => prev.filter((sub, i) => i !== index));
    }
  };

  const validateName = (v) => (!v.trim() ? "Enter Valid Name" : "");
  const validateCapacity = (v) =>
    Number(v.trim()) <= 0 || isNaN(v.trim()) ? "Enter Valid Capacity" : "";
  const handleSubmit = async () => {
    let isValid = true;
    subVenues.forEach((subVenue, index) => {
      const newErrors = { name: "", capacity: "" };
      newErrors.name = validateName(subVenue.name);
      newErrors.capacity = validateCapacity(subVenue.capacity);
      if (newErrors.name || newErrors.capacity) isValid = false;
      setErrors((prev) =>
        prev.map((errs, i) => {
          if (i == index) return { ...newErrors };
          else return errs;
        })
      );
    });
    if (isValid) {
      const subVenueData = {
        user_id: userId,
        venue_id: venueId,
        sub_venues: [],
      };
      subVenues.forEach((subVenue) => {
        subVenueData.sub_venues.push({
          sub_venue_name: subVenue.name,
          sub_venue_capacity: subVenue.capacity,
          sub_venue_status: subVenue.status,
        });
      });
      try {
        setLoading(true);
        const { data } = await axios.post(
          "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/subVenueRegistration",
          subVenueData
        );
        if (data.status_code == 200) {
          console.log(data);
          Toast.success(data.data.message);

          router.replace("/register/success");
        }
      } catch (error) {
        Toast.error("Internal Error");
      } finally {
        setLoading(false);
      }
    }
  };

  const setSubVenue = (field, value, index, validator) => {
    const newSubVenues = subVenues.map((subVenue, i) => {
      if (i == index) return { ...subVenue, [field]: value };
      else return subVenue;
    });
    setSubVenues(newSubVenues);
    if (validator)
      setErrors((prev) =>
        prev.map((errs, i) => {
          if (i == index) return { ...errs, [field]: validator(value) };
          else return errs;
        })
      );
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
              validateName={validateName}
              validateCapacity={validateCapacity}
              onDelete={() => deleteSubVenue(index)}
              onChange={setSubVenue}
            />
          )}
        />
        <CustomButton
          text={"Submit"}
          onPress={handleSubmit}
          loading={loading}
        />
      </ScreenWrapper>
    </View>
  );
};
export default Step3;
const styles = StyleSheet.create({});
