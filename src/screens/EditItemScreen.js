import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import InventoryContext from "../context/InventoryContext";

const EditItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { updateItem } = useContext(InventoryContext);
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleSave = () => {
    updateItem({ ...item, name, quantity });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#262B35",
    color: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: "#ffF",
  },
});

export default EditItemScreen;
