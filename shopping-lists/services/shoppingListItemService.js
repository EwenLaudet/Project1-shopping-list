import { sql } from "../database/database.js";

const createShoppingListItem = async (shopping_list_id, name) => {
  await sql`INSERT INTO
  shopping_list_items (shopping_list_id, name)
    VALUES (${ shopping_list_id }, ${ name })`;
};

const findCurrentShoppingListItem = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${ listId } AND collected IS FALSE`; // WHERE shopping_list_id = ${ itemId } 

  /** 
  const rows = await sql`SELECT * FROM shopping_list_items
     `; // WHERE shopping_list_id = ${ itemId } AND collected IS FALSE

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return false; */
};

const finishShoppingListItem = async (id) => {
  await sql`UPDATE shopping_list_items
    SET collected = TRUE WHERE id = ${ id }`;
};

export { createShoppingListItem, findCurrentShoppingListItem, finishShoppingListItem };



