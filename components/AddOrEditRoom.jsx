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
import { getRoomsInfo, getUserInfo } from "../store/userSlice";
const emptyData = {
  number: "",
  type: "",
  cost: "",
};
const emptyErrors = {
  number: "",
  type: "",
  cost: "",
};
const AddOrEditRoom = ({ visible, setVisible, editing, initialData }) => {
  const [room, setRoom] = useState(emptyData);
  const [errors, setErrors] = useState(emptyErrors);
  const [loading, setLoading] = useState(false);
  const {
    user: { user_id },
    loading: userLoading,
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const validateNumber = (v) => {
    if (v.trim().length == 0) return "Enter Valid Number";
    else return "";
  };
  const validateType = (v) => {
    if (v.trim().length == 0) return "Enter Valid type";
    else return "";
  };
  const validateCost = (v) => {
    if (isNaN(Number(v.trim())) || Number(v.trim()) <= 0)
      return "Enter Valid Cost";
    else return "";
  };
  const loadRoomsInfo = async () => {
    const res = await dispatch(getRoomsInfo(user_id)).unwrap();
    if (res.status_code == 200) handleClose();
    else Toast.error(res.message);
  };
  const handleSubmit = async () => {
    const numberErr = validateNumber(room.number);
    const typeErr = validateType(room.type);
    const costErr = validateCost(room.cost);
    setErrors({ number: numberErr, type: typeErr, cost: costErr });
    if (!numberErr && !typeErr && !costErr) {
      try {
        setLoading(true);
        if (!editing) {
          const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/addRooms`,
            {
              user_id,
              room_name: room.number,
              room_type: room.type,
              room_cost: room.cost,
            }
          );
          if (data.status_code == 200) {
            Toast.success("Room added successfully");
            loadRoomsInfo();
          } else Toast.error(data.message);
        } else {
          const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/updateRoom`,
            {
              room_id: initialData.roomId,
              room_name: room.number,
              room_type: room.type,
              room_cost: room.cost,
            }
          );
          if (data.status_code == 200) {
            Toast.success("Room Updated Successfully");
            loadRoomsInfo();
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
    setRoom(emptyData);
    setErrors(emptyErrors);
  };
  useEffect(() => {
    if (editing)
      setRoom({
        number: initialData?.number,
        type: initialData?.type,
        cost: initialData?.cost,
      });
  }, [initialData, editing]);
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={handleClose}
      animationType="none"
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
                  <Typo
                    position="center"
                    size={16}
                    style={{ marginVertical: 15 }}
                  >
                    {editing ? "Edit" : "Add"} Room
                  </Typo>

                  <CustomTextInput
                    label={"Room Number"}
                    value={room.number}
                    error={errors.number}
                    onChange={(v) => {
                      setRoom({ ...room, number: v });
                      setErrors({ ...errors, number: validateNumber(v) });
                    }}
                  />
                  <CustomTextInput
                    label={"Room Type"}
                    value={room.type}
                    error={errors.type}
                    onChange={(v) => {
                      setRoom({ ...room, type: v });
                      setErrors({ ...errors, type: validateType(v) });
                    }}
                  />
                  <CustomTextInput
                    label={"Room Cost"}
                    value={room.cost}
                    error={errors.cost}
                    keyboardType="numeric"
                    onChange={(v) => {
                      setRoom({ ...room, cost: v });
                      setErrors({ ...errors, cost: validateCost(v) });
                    }}
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
export default AddOrEditRoom;
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
