import { test, expect } from "@playwright/test";
import {
  business,
  budgets,
  categories,
  locations,
  properties,
  purposes,
} from "../src/data.js";

const cards = (page) => page.locator(".property-card");
const routes = [
  "/",
  "/properties",
  "/residential",
  "/commercial",
  "/plots-land",
  "/about",
  "/contact",
];
const errors = [];
test.beforeEach(async ({ page }) => {
  errors.length = 0;
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(() => expect(errors).toEqual([]));

test("all navigation routes render; unknown pages and properties show 404", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page).toHaveTitle(/Rohit Real Estate/);
    await expect(page.locator("header .brand")).toContainText("ROHIT");
    await page.locator('header nav a[href="/about"]').click();
    await expect(page.locator("main h1")).toContainText("Meet Rohit");
  }
  for (const route of ["/missing", "/properties/missing"]) {
    await page.goto(route);
    await expect(
      page.getByText("PAGE NOT FOUND", { exact: true }),
    ).toBeVisible();
    await page
      .getByRole("link", { name: "Explore sample properties", exact: true })
      .click();
    await expect(cards(page)).toHaveCount(6);
  }
});

test("each sample renders its detail, image, personal enquiry and correct contacts", async ({
  page,
}) => {
  for (const property of properties) {
    await page.goto(`/properties/${property.id}`);
    await expect(page.locator("h1")).toHaveText(property.name);
    await expect(page.locator(".detail-hero .concept-tag")).toHaveText(
      "Concept / Sample Listing",
    );
    await expect(page.locator(".detail-hero > img")).toHaveJSProperty(
      "complete",
      true,
    );
    expect(
      await page
        .locator(".detail-hero > img")
        .evaluate((img) => img.naturalWidth),
    ).toBeGreaterThan(0);
    const href = await page
      .locator('.detail-aside a[href^="https://wa.me/"]')
      .getAttribute("href");
    const url = new URL(href);
    expect(url.pathname).toBe("/919468130844");
    expect(url.searchParams.get("text")).toContain(property.name);
    expect(url.searchParams.get("text")).toContain(property.id);
    expect(url.searchParams.get("text")).toContain("Concept / Sample Listing");
    await page.getByRole("link", { name: "Share my requirements" }).click();
    await expect(page.locator("#field-message")).toHaveValue(
      new RegExp(property.name),
    );
    await expect(page.locator(".enquiry-context")).toContainText(property.name);
    expect(
      await page
        .locator('a[href^="tel:"]')
        .evaluateAll((links) => links.map((a) => a.getAttribute("href"))),
    ).toEqual([business.callUrl, business.callUrl]);
    expect(await page.locator('a[href^="mailto:"]').count()).toBe(0);
  }
});

test("all four filters intersect, persist on reload, reset, and show empty results", async ({
  page,
}) => {
  await page.goto("/properties");
  await expect(cards(page)).toHaveCount(6);
  await expect(page.locator(".property-card .concept-tag")).toHaveCount(6);
  for (const property of properties) {
    await page.getByRole("button", { name: "Clear filters" }).click();
    const filters = {};
    for (const [key, label] of [
      ["location", "Location"],
      ["type", "Property type"],
      ["purpose", "Purpose"],
      ["budget", "Sample budget"],
    ]) {
      filters[key] = property[key];
      await page.getByLabel(label, { exact: true }).selectOption(property[key]);
      const matches = properties.filter((p) =>
        Object.entries(filters).every(([k, v]) => p[k] === v),
      );
      await expect(cards(page)).toHaveCount(matches.length);
    }
    await expect(cards(page).first()).toContainText(property.name);
    await page.reload();
    await expect(cards(page)).toHaveCount(1);
    for (const [key, value] of Object.entries(filters))
      expect(new URL(page.url()).searchParams.get(key)).toBe(value);
  }
  await page.getByLabel("Location", { exact: true }).selectOption("Rewari");
  await expect(cards(page)).toHaveCount(0);
  await expect(
    page.getByText("No sample listings match these filters."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(cards(page)).toHaveCount(6);
  expect(new URL(page.url()).search).toBe("");
});

test("categories remain scoped when navigating and query filtering", async ({
  page,
}) => {
  await page.goto("/");
  for (const category of categories) {
    await page.locator(`header nav a[href="/${category.slug}"]`).click();
    await expect(cards(page)).toHaveCount(2);
    const expected = properties.filter((p) => p.category === category.slug);
    for (const property of expected)
      await expect(cards(page).filter({ hasText: property.name })).toHaveCount(
        1,
      );
    await page
      .getByLabel("Property type", { exact: true })
      .selectOption(expected[0].type);
    await expect(cards(page)).toHaveCount(1);
  }
  await page.goto("/properties?location=Rewari&purpose=Self+Use");
  await expect(cards(page)).toHaveCount(2);
});

test("form validates inputs and prepares encoded WhatsApp message without sending", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Review WhatsApp enquiry" }).click();
  await expect(page.locator(".field-error")).toHaveCount(6);
  await expect(page.locator("#field-name")).toBeFocused();
  await expect(page.locator(".form-success")).toHaveCount(0);
  await page.getByLabel("Your name").fill("A & B Sharma");
  await page.getByLabel("Mobile number").fill("+91 letters 9468130844");
  await page.getByLabel("Preferred location").selectOption(locations[0]);
  await page.getByLabel("Budget preference").selectOption(budgets[0]);
  await page
    .getByRole("combobox", { name: "Purpose", exact: true })
    .selectOption(purposes[0]);
  await page
    .getByLabel("Your message")
    .fill("Looking for a home & plot. Budget ₹45 lakh?");
  await page.getByRole("button", { name: "Review WhatsApp enquiry" }).click();
  await expect(page.locator("#field-phone")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.locator(".form-success")).toHaveCount(0);
  for (const phone of ["1234567890", "946813084", "+199468130844"]) {
    await page.getByLabel("Mobile number").fill(phone);
    await page.getByRole("button", { name: "Review WhatsApp enquiry" }).click();
    await expect(page.locator(".form-success")).toHaveCount(0);
  }
  await page.getByLabel("Mobile number").fill("+91 94681 30844");
  await page.getByRole("button", { name: "Review WhatsApp enquiry" }).click();
  await expect(page.locator(".field-error")).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText(
    "Nothing has been sent or saved",
  );
  const href = await page
    .getByRole("link", { name: "Open WhatsApp with enquiry" })
    .getAttribute("href");
  const url = new URL(href);
  expect(url.pathname).toBe("/919468130844");
  expect(url.searchParams.get("text")).toContain("A & B Sharma");
  expect(url.searchParams.get("text")).toContain(
    "Looking for a home & plot. Budget ₹45 lakh?",
  );
  expect(url.searchParams.get("text")).toContain("Rohit Jaat");
  await page
    .getByLabel("Your message")
    .fill("Updated requirements for a shop.");
  await expect(page.locator(".form-success")).toHaveCount(0);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`responsive layout, images and contact links at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [...routes, "/properties/rewari-residential-plot"]) {
      await page.goto(route);
      for (const img of await page.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0))
          .toBe(true);
      }
      await page.locator("footer").scrollIntoViewIfNeeded();
      await expect
        .poll(async () =>
          page
            .locator("img")
            .evaluateAll((images) =>
              images.every((img) => img.complete && img.naturalWidth > 0),
            ),
        )
        .toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const calls = await page
        .locator('a[href^="tel:"]')
        .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
      expect(calls.length).toBeGreaterThan(0);
      expect(calls.every((href) => href === business.callUrl)).toBe(true);
      const whatsapps = await page
        .locator('a[href^="https://wa.me/"]')
        .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
      expect(whatsapps.length).toBeGreaterThan(0);
      expect(
        whatsapps.every((href) => new URL(href).pathname === "/919468130844"),
      ).toBe(true);
    }
    if (width <= 900) {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(page.locator("header nav")).toBeVisible();
      await page.locator('header nav a[href="/commercial"]').click();
      await expect(page).toHaveURL(/\/commercial$/);
      await expect(
        page.getByRole("button", { name: "Open menu" }),
      ).toHaveAttribute("aria-expanded", "false");
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.keyboard.press("Escape");
      await expect(page.locator("header nav")).toBeHidden();
    }
  });
}
