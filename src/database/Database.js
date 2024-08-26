import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Inventory.db";
const database_version = "1.0";
const database_displayname = "SQLite Inventory Database";
const database_size = 200000;

export const getDBConnection = async () => {
  try {
    return SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    );
  } catch (error) {
    console.error("Failed to get DB connection:", error);
    throw error;
  }
};

export const createTables = async (db) => {
  try {
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL
      );
    `);
  } catch (error) {
    console.error("Failed to create tables:", error);
    throw error;
  }
};

export const getItems = async (db) => {
  try {
    const items = [];
    const results = await db.executeSql("SELECT * FROM Items");

    // Verificar se results[0] e results[0].rows não são nulos ou indefinidos
    if (results[0] && results[0].rows) {
      // Verificar se há resultados válidos
      if (results[0].rows.length > 0) {
        for (let i = 0; i < results[0].rows.length; i++) {
          items.push(results[0].rows.item(i));
        }
      }
    } else {
      console.warn("No rows returned from database query.");
    }

    return items;
  } catch (error) {
    console.error("Failed to get items:", error);
    throw error;
  }
};

export const saveItem = async (db, name, quantity) => {
  if (!name || quantity === null || quantity === undefined) {
    console.error("Invalid item data:", { name, quantity });
    throw new Error("Invalid item data");
  }
  try {
    console.log("Saving item to DB:", { name, quantity });
    await db.executeSql("INSERT INTO Items (name, quantity) VALUES (?, ?)", [
      name,
      quantity,
    ]);
  } catch (error) {
    console.error("Failed to save item:", error);
    throw error;
  }
};

export const updateItem = async (db, id, name, quantity) => {
  if (!id || !name || quantity === null || quantity === undefined) {
    console.error("Invalid updated item data:", { id, name, quantity });
    throw new Error("Invalid updated item data");
  }
  try {
    console.log("Updating item in DB:", { id, name, quantity });
    await db.executeSql(
      "UPDATE Items SET name = ?, quantity = ? WHERE id = ?",
      [name, quantity, id]
    );
  } catch (error) {
    console.error("Failed to update item:", error);
    throw error;
  }
};

export const deleteItem = async (db, id) => {
  if (!id) {
    console.error("Invalid item id:", id);
    throw new Error("Invalid item id");
  }
  try {
    console.log("Deleting item from DB:", id);
    await db.executeSql("DELETE FROM Items WHERE id = ?", [id]);
  } catch (error) {
    console.error("Failed to delete item:", error);
    throw error;
  }
};
