import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as shoppingListItemService from "../services/shoppingListItemService.js";
import * as requestUtils from "../utils/requestUtils.js";


const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);
  
  return requestUtils.redirectTo("/lists");
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: await listService.findById(urlParts[2]),
    current_items: await shoppingListItemService.findCurrentShoppingListItem(urlParts[2]),
    collected_items: await shoppingListItemService.findCollectedShoppingListItem(urlParts[2]),
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllActiveLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

export { addList, viewLists, viewList };