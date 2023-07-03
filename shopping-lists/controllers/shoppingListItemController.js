import * as shoppingListItemService from "../services/shoppingListItemService.js";

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const createShoppingListItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const formData = await request.formData();
  const name = formData.get("name");
  
  await shoppingListItemService.createShoppingListItem(urlParts[2], name);

  return redirectTo(`/lists/${urlParts[2]}`);
};

export { createShoppingListItem };