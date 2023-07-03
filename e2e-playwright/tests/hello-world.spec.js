const { test, expect } = require("@playwright/test");

test("Page is showing with correct titles", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Shopping list");
  await expect(page.locator("h2")).toHaveText(["Add a shopping list", "Active lists"]);
});

test("Can create a list", async ({ page }) => {
  await page.goto("/");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`li >> text='${listName}'`)).toHaveText(listName);
});

test("Show a newly created list", async ({ page }) => {
  await page.goto("/");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await page.getByText(listName).click();
  await expect(page.locator("h1")).toHaveText(listName);
});

test("Can create an item in a list", async ({ page }) => {
  await page.goto("/");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await page.getByText(listName).click();

  const itemName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`li >> text='${itemName}'`)).toHaveText(itemName);
});