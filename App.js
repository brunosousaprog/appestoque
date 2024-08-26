import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import InventoryScreen from "./src/screens/InventoryScreen";
import EditItemScreen from "./src/screens/EditItemScreen";
import { InventoryProvider } from "./src/context/InventoryContext";

const Stack = createStackNavigator();

function App() {
  return (
    <InventoryProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Tela Inicial" component={HomeScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="EditItem" component={EditItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </InventoryProvider>
  );
}

export default App;
