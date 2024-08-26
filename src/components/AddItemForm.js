import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import InventoryContext from "../context/InventoryContext";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const { addItem } = useContext(InventoryContext);

  const handleSubmit = async () => {
    try {
      if (!name || !quantity) {
        throw new Error("Nome e quantidade são obrigatórios.");
      }

      const parsedQuantity = parseInt(quantity, 10);
      if (isNaN(parsedQuantity)) {
        throw new Error("Quantidade deve ser um número.");
      }

      console.log("Adding item:", { name, quantity: parsedQuantity });
      await addItem({ name, quantity: parsedQuantity });

      setName("");
      setQuantity("");
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.error("Failed to add item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Item"
        placeholderTextColor="#fff"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        placeholderTextColor="#fff"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Button title="Adicionar Item" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "#fff",
  },
});

export default AddItemForm;
