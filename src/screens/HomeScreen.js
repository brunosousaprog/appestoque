import React from "react";
import { View, Button, StyleSheet, Image, Text, } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../../assets/img/cantinalogo2.png")} />
      </View>
      <Text style={styles.text}>Gerenciador de Estoque</Text>
      <Button
        title="Acessar Estoque"
        onPress={() => navigation.navigate("Inventory")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#89af59",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: "#fff",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default HomeScreen;
