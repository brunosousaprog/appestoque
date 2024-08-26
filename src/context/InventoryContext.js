// inventoryContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getDBConnection,
  createTables,
  getItems,
  saveItem,
  deleteItem as deleteItemFromDB,
} from "../../src/database/Database";

const InventoryContext = createContext();

export const useInventoryContext = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await getDBConnection();
        await createTables(db);
        const storedItems = await getItems(db);
        setItems(storedItems);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  const addItem = async (item) => {
    try {
      const db = await getDBConnection();
      await saveItem(db, item.name, item.quantity);
      await loadData(); // Carrega os itens novamente após adicionar um novo item
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const db = await getDBConnection();
      await deleteItemFromDB(db, id);
      await loadData(); // Carrega os itens novamente após excluir um item
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const loadData = async () => {
    try {
      const db = await getDBConnection();
      const storedItems = await getItems(db);
      setItems(storedItems);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        addItem,
        deleteItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;
