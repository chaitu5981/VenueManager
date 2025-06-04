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
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
const CustomSelect = ({
  label,
  value,
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
  const [filtered, setFiltered] = useState([]);
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [showAddMissingForm, setShowAddMissingForm] = useState(false);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    setFiltered(
      options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);
  useEffect(() => {
    if (addMissing && filtered.length == 0 && search) setShowAddBtn(true);
    else setShowAddBtn(false);
  }, [filtered, search]);
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <CustomTextInput
          label={label}
          error={error}
          customStyle={customStyle}
          value={value}
          editable={false}
          right={
            <TextInput.Icon
              icon={modalVisible ? "chevron-up" : "chevron-down"}
              onPress={() => setModalVisible(!modalVisible)}
            />
          }
        />
      </TouchableOpacity>
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
                {searchable && (
                  <TextInput
                    value={search}
                    onChangeText={(v) => setSearch(v)}
                    style={styles.search}
                    right={<TextInput.Icon icon="select-search" />}
                  />
                )}
                {loading ? (
                  <ActivityIndicator style={{ marginTop: 20 }} />
                ) : showAddBtn ? (
                  <Button
                    onPress={() => {
                      Keyboard.dismiss();
                      setSearch("");
                      setModalVisible(false);
                      setShowAddMissingForm(true);
                    }}
                  >
                    Add City
                  </Button>
                ) : (
                  <FlatList
                    nestedScrollEnabled
                    data={filtered}
                    keyExtractor={(item, i) => i}
                    keyboardShouldPersistTaps="handled"
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 15 }} />
                    )}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          onSelect(item.value);
                          Keyboard.dismiss();
                          setModalVisible(false);
                          setSearch("");
                        }}
                      >
                        <Typo>{item.label}</Typo>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        visible={showAddMissingForm}
        onRequestClose={() => setShowAddMissingForm(false)}
        transparent
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowAddMissingForm(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Typo position={"center"}>Add City</Typo>
              <CustomTextInput onChange={(v) => setNewItem(v)} />
              <Button
                loading={addMissingLoading}
                onPress={async () => {
                  console.log(newItem);
                  await addMissing(newItem.trim());
                  setShowAddMissingForm(false);
                  Keyboard.dismiss();
                }}
              >
                Submit
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
export default CustomSelect;
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
});
