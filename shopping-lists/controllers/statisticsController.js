import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as shoppingListItemService from "../services/shoppingListItemService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewHome = async (request) => {
  
    const data = {
      lists: await listService.numberLists(),
      items: await shoppingListItemService.numberItems(),
    };
  
    return new Response(await renderFile("home.eta", data), responseDetails);
};

export { viewHome };