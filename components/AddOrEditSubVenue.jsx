import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { IconButton, RadioButton } from "react-native-paper";
import Typo from "./Typo";
import CustomTextInput from "./CustomTextInput";
import CustomSelect from "./CustomSelect";
import CustomButton from "./CustomButton";
import axios from "axios";
import { subVenueStatus } from "../data/constants";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { getUserInfo } from "../store/userSlice";
import { router } from "expo-router";
const emptyData = {
  type: "Hall",
  name: "",
  capacity: "",
  status: "Active",
};
const emptyErrors = {
  name: "",
  capacity: "",
};
const AddOrEditSubVenue = ({
  visible,
  setVisible,
  editing = false,
  initialData,
}) => {
  const [subVenue, setSubVenue] = useState(emptyData);
  const [errors, setErrors] = useState(emptyErrors);
  const [loading, setLoading] = useState(false);
  const {
    user: { user_id },
    venue: { venue_id },
    loading: userLoading,
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const validateName = (v) => {
    if (v.trim().length == 0) return "Enter Valid Name";
    else return "";
  };
  const validateCapacity = (v) => {
    if (isNaN(Number(v.trim())) || Number(v.trim()) <= 0)
      return "Enter Valid Capacity";
    else return "";
  };
  const handleSubmit = async () => {
    const nameErr = validateName(subVenue.name);
    const capacityErr = validateCapacity(subVenue.capacity);
    setErrors({ name: nameErr, capacity: capacityErr });
    if (!nameErr && !capacityErr) {
      try {
        setLoading(true);
        if (!editing) {
          const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/subVenueRegistration`,
            {
              user_id,
              venue_id,
              sub_venues: [
                {
                  sub_venue_name: subVenue.name,
                  sub_venue_type: subVenue.type,
                  sub_venue_capacity: subVenue.capacity,
                  sub_venue_status: subVenue.status,
                },
              ],
            }
          );
          if (data.status_code == 200) {
            Toast.success(data.data.message);
            await dispatch(getUserInfo(user_id));
            if (error) Toast.error(error);
            setVisible(false);
            Keyboard.dismiss();
            router.back();
          } else Toast.error(data.message);
        } else {
          const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/updateSubVenueRegistration`,
            {
              sub_venue_id: initialData.subVenueId,
              sub_venue_name: subVenue.name,
              sub_venue_type: subVenue.type,
              sub_venue_capacity: subVenue.capacity,
              sub_venue_status: subVenue.status,
            }
          );
          if (data.status_code == 200) {
            Toast.success(data.message);
            await dispatch(getUserInfo(user_id));
            if (error) Toast.error(error);
            setVisible(false);
            Keyboard.dismiss();
            router.back();
          } else Toast.error(data.message);
        }
      } catch (error) {
        Toast.error("Internal Error");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleClose = () => {
    setVisible(false);
    setSubVenue(emptyData);
    setErrors(emptyErrors);
  };
  useEffect(() => {
    if (editing)
      setSubVenue({
        type: initialData?.type || "Hall",
        name: initialData?.name || "",
        capacity: initialData?.capacity || "",
        status: initialData?.status || "Active",
      });
  }, [initialData, editing]);
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={handleClose}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalBox}>
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
                  onPress={handleClose}
                />
                <View style={{ gap: 8 }}>
                  <Typo size={16}>Sub Venue Type :</Typo>
                  <RadioButton.Group
                    onValueChange={(value) =>
                      setSubVenue({ ...subVenue, type: value })
                    }
                    value={subVenue.type}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton value="Hall" />
                        <Text>Hall</Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton value="Lawn" />
                        <Text>Lawn</Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton value="Others" />
                        <Text>Others</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                  <CustomTextInput
                    label={`${subVenue.type} Name`}
                    value={subVenue.name}
                    error={errors.name}
                    onChange={(v) => {
                      setSubVenue({ ...subVenue, name: v });
                      setErrors({ ...errors, name: validateName(v) });
                    }}
                  />
                  <CustomTextInput
                    label={"Capacity"}
                    keyboardType="numeric"
                    value={subVenue.capacity}
                    error={errors.capacity}
                    onChange={(v) => {
                      setSubVenue({ ...subVenue, capacity: v });
                      setErrors({ ...errors, capacity: validateCapacity(v) });
                    }}
                  />
                  <CustomSelect
                    label={"Status"}
                    value={subVenue.status}
                    onSelect={(v) => setSubVenue({ ...subVenue, status: v })}
                    options={subVenueStatus}
                  />
                  <CustomButton
                    text={"Save"}
                    onPress={handleSubmit}
                    loading={loading || userLoading}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default AddOrEditSubVenue;
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    width: "70%",
    padding: 15,
    borderRadius: 10,
  },
});
