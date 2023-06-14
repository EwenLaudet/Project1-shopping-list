const { test, expect } = require("@playwright/test");

test("Page is showing with correct titles", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Shopping list");
  await expect(page.locator("h2")).toHaveText(["Add a shopping list", "Active lists"]);
});

test("Can create a list"), async ({ page }) => {
  await page.goto("/");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
}