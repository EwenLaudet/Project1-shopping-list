const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  await page.goto('/lists');
});

test("Page is showing with correct titles", async ({ page }) => {
  await expect(page.locator("h1")).toHaveText("Shopping list");
  await expect(page.locator("h2")).toHaveText(["Add a shopping list", "Active lists"]);
});

test("Can create a list", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await expect(page.locator(`li >> text='${listName}'`)).toContainText(listName);
});

test("Show a newly created list", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await page.getByText(listName).click();
  await expect(page.locator("h1")).toContainText(listName);
});

test("Can create an item in a list", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await page.getByText(listName).click();

  const itemName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`li >> text='${itemName}'`)).toContainText(itemName);
});

test("Can collect an item", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await page.getByText(listName).click();

  const itemName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit]").click();

  await page.getByRole('button', { name: 'Mark collected!' }).click();
  await expect(page.locator(`del >> text='${itemName}'`)).toHaveText(itemName);
});

// test("The items are shown in alphabetic order", async ({ page }) => {
// });

test("Can delete an empty list", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await page.getByText(listName).click();

  await page.goto('/lists');
  await page.getByText(listName).click();
  await expect(page.locator(`li >> text='${listName}'`)).toHaveCount(0);
});

test("Can delete a list with items", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await page.getByText(listName).click();

  const itemNameOne = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemNameOne);
  await page.getByRole('button', { name: 'Add an item!' }).click();

  const itemNameTwo = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemNameTwo);
  await page.getByRole('button', { name: 'Add an item!' }).click();

  await page.goto('/lists');
  await page.getByText(listName).click();
  await expect(page.locator(`li >> text='${listName}'`)).toHaveCount(0);
});

test("Home page is showing statistics when shopping lists have been created", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();

  await page.goto('/');
  await expect(page.locator(`body > p `)).toHaveCount(2);
});