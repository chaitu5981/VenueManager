import {
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomTextInput from "./CustomTextInput";
import { useEffect, useState } from "react";
import Typo from "./Typo";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  TextInput,
} from "react-native-paper";
import { colors } from "../data/theme";
const CustomMultiSelect = ({
  label,
  values,
  optional = false,
  onSelect,
  searchable = false,
  options,
  error,
  loading = false,
  customStyle,
  addMissing = null,
  addMissingLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [showAddMissingForm, setShowAddMissingForm] = useState(false);
  const [newItem, setNewItem] = useState("");
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <CustomTextInput
          label={label}
          optional={optional}
          error={error}
          customStyle={customStyle}
          value={values.length == 0 ? "" : " "}
          editable={false}
          right={
            <TextInput.Icon
              icon={modalVisible ? "chevron-up" : "chevron-down"}
              onPress={() => setModalVisible(!modalVisible)}
            />
          }
        />
      </TouchableOpacity>
      <View style={styles.pills}>
        <FlatList
          data={values}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            return (
              item == "WholeDay" || (
                <View style={styles.pill}>
                  <Typo>{item}</Typo>
                </View>
              )
            );
          }}
        />
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalBox}>
                <FlatList
                  nestedScrollEnabled
                  data={options}
                  keyExtractor={(item, i) => i}
                  keyboardShouldPersistTaps="handled"
                  ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        onSelect(item.value);
                        Keyboard.dismiss();
                        setSearch("");
                      }}
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        status={
                          values.includes(item.value) ? "checked" : "unchecked"
                        }
                      />
                      <Typo>{item.label}</Typo>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
export default CustomMultiSelect;
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    maxHeight: "70%",
    backgroundColor: "white",
    width: "60%",
    padding: 15,
    borderRadius: 10,
  },
  search: {
    backgroundColor: "white",
    borderRadius: 0.5,
  },
  pills: {
    position: "absolute",
    left: 10,
    top: 15,
  },
  pill: {
    backgroundColor: "lightgray",
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
