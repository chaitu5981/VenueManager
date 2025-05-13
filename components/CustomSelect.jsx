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
import { ActivityIndicator, TextInput } from "react-native-paper";
const CustomSelect = ({
  label,
  value,
  onSelect,
  searchable = false,
  options,
  error,
  loading = false,
  customStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(
      options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);
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
            <View style={styles.modalBox}>
              {searchable && (
                <TextInput
                  value={search}
                  onChangeText={(v) => setSearch(v)}
                  style={styles.search}
                />
              )}
              {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
              ) : (
                <FlatList
                  nestedScrollEnabled
                  data={filtered}
                  keyExtractor={(item, i) => i}
                  keyboardShouldPersistTaps="handled"
                  ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
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
