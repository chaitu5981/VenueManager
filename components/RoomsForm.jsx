import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "./CustomTextInput";
import Typo from "./Typo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useLayoutEffect } from "react";
const RoomsForm = ({ accommodation, setAccommodation, errors, setErrors }) => {
  const setRoomNo = (v, index) => {
    const newList = accommodation.rooms.list.map((room, i) => {
      if (i === index)
        return {
          ...room,
          roomNo: v,
        };
      else return { ...room };
    });
    setAccommodation({
      ...accommodation,
      rooms: { ...accommodation.rooms, list: newList },
    });
  };
  const setRoomCost = (v, index) => {
    const newList = accommodation.rooms.list.map((room, i) => {
      if (i === index)
        return {
          ...room,
          roomCost: Number(v),
        };
      else return { ...room };
    });
    setAccommodation({
      ...accommodation,
      rooms: {
        ...accommodation.rooms,
        list: newList,
      },
    });
  };
  const addRoom = () => {
    if (accommodation.rooms.list.length < accommodation.rooms.noOfRooms) {
      setAccommodation({
        ...accommodation,
        rooms: {
          ...accommodation.rooms,
          list: [...accommodation.rooms.list, { roomNo: "", roomCost: 0 }],
        },
      });
      setErrors({
        ...errors,
        rooms: [...errors.rooms, { roomNo: "", roomCost: "" }],
      });
    }
  };
  const deleteRoom = (index) => {
    if (accommodation.rooms.list.length > accommodation.rooms.noOfRooms) {
      const newList = accommodation.rooms.list.filter((room, i) => i !== index);
      const newErrors = errors.rooms.filter((e, i) => i !== index);
      setAccommodation({
        ...accommodation,
        rooms: { ...accommodation.rooms, list: newList },
      });
      setErrors({ ...errors, rooms: newErrors });
    }
  };
  const getTotalRoomsCost = () => {
    return accommodation.rooms.list.reduce(
      (acc, room) => acc + room.roomCost,
      0
    );
  };
  return (
    <View style={{ gap: 10 }}>
      <CustomTextInput
        label={"No Of Rooms"}
        value={accommodation.rooms.noOfRooms.toString()}
        onChange={(v) => {
          setAccommodation({
            ...accommodation,
            rooms: { ...accommodation.rooms, noOfRooms: Number(v) },
          });
        }}
        error={errors.noOfRooms}
      />

      {accommodation.rooms.list.map((room, i) => (
        <View key={i} style={{ gap: 7 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Typo style={{ flexGrow: 1 }}>Enter Room {i + 1} Details</Typo>
            {i == 0 && (
              <TouchableOpacity onPress={addRoom}>
                <Ionicons
                  name="add-circle"
                  size={40}
                  color="blue"
                  onPress={addRoom}
                />
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
                label={"Room Number"}
                value={room.roomNo}
                onChange={(v) => setRoomNo(v, i)}
                error={errors.rooms[i].roomNo}
              />
              <TouchableOpacity onPress={() => deleteRoom(i)}>
                <MaterialCommunityIcons
                  name="delete-circle"
                  size={40}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </View>
          <CustomTextInput
            label={"Cost per Room"}
            value={room.roomCost.toString()}
            onChange={(v) => setRoomCost(v, i)}
            error={errors.rooms[i].roomCost}
          />
        </View>
      ))}
      <CustomTextInput
        label={"Total Rooms Cost"}
        value={getTotalRoomsCost().toString()}
        editable={false}
      />
    </View>
  );
};
export default RoomsForm;
const styles = StyleSheet.create({});
