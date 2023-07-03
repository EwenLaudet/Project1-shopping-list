const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  await page.goto('/');
  //await page.getByLabel('Username or email address').fill('username');
  //await page.getByLabel('Password').fill('password');
  //await page.getByRole('button', { name: 'Sign in' }).click();
});

test("Page is showing with correct titles", async ({ page }) => {
  await expect(page.locator("h1")).toHaveText("Shopping list");
  await expect(page.locator("h2")).toHaveText(["Add a shopping list", "Active lists"]);
});

test("Can create a list", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`li >> text='${listName}'`)).toHaveText(listName);
});

test("Show a newly created list", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await page.getByText(listName).click();
  await expect(page.locator("h1")).toHaveText(listName);
});

test("Can create an item in a list", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await page.getByText(listName).click();

  const itemName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`li >> text='${itemName}'`)).toContainText(itemName);
});

test("Can collect an item", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await page.getByText(listName).click();

  const itemName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit]").click();

  await page.getByRole('button', { name: 'Mark collected!' }).click();
  await expect(page.locator(`del >> text='${itemName}'`)).toHaveText(itemName);
});

// test("The items are shown in alphabetic order", async ({ page }) => {
// });