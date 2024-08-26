import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import InventoryContext from "../context/InventoryContext";
import { useNavigation } from "@react-navigation/native";

const InventoryList = () => {
  const { items, deleteItem } = useContext(InventoryContext);
  const navigation = useNavigation();

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.quantity}>{item.quantity}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditItem", { item })}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(item.id)}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "green",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
  name: {
    fontSize: 18,
    color: "#fff",
  },
  quantity: {
    fontSize: 18,
    color: "#fff",
  },
});

export default InventoryList;
