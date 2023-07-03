import * as shoppingListItemService from "../services/shoppingListItemService.js";
import * as requestUtils from "../utils/requestUtils.js";


const createShoppingListItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const formData = await request.formData();
  const name = formData.get("name");

  await shoppingListItemService.createShoppingListItem(urlParts[2], name);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const collectShoppingListItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await shoppingListItemService.collectShoppingListItem(urlParts[4]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { createShoppingListItem, collectShoppingListItem };