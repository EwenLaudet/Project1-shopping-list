import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const deactivate = async (idList) => {
  await sql`UPDATE shopping_lists SET active = FALSE WHERE id = ${ idList }`;
};

const findAllActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, name: "Unknown" };
};

const numberLists = async () => {
  const rows = await sql`SELECT COUNT(*) as count_lists FROM shopping_lists `;
  return rows[0].count_lists;
};

export { create, deactivate, findAllActiveLists, findById, numberLists };