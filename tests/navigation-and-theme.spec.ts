import { test, expect } from "@playwright/test";

test.describe("Susiram Premium Healthcare - E2E Testing Suite", () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto("/", { timeout: 15000 });
  });

  test("1. Theme Toggle - Light and Dark Mode Verification", async ({ page }) => {
    // Verify default theme is dark (as configured in Providers.tsx)
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);

    // Wait for button to be fully mounted/hydrated (non-zero opacity)
    const toggleButton = page.locator('button:has-text("Toggle theme"):not(.opacity-0)').first();
    await expect(toggleButton).toBeVisible({ timeout: 5000 });
    
    // Click the theme toggle button
    await toggleButton.click();

    // Verify it transitions to light mode (removes or changes class)
    await expect(html).not.toHaveClass(/dark/);

    // Toggle back to dark mode
    await toggleButton.click();
    await expect(html).toHaveClass(/dark/);
  });

  test("2. Homepage - Navigation & Smooth Scroll to Section", async ({ page }) => {
    // Click on 'Services' navigation link
    const servicesLink = page.locator('a:has-text("Services")').first();
    await servicesLink.click();

    // Verify URL contains hash
    await expect(page).toHaveURL(/#services/);
    
    // Click on 'Our Doctors' navigation link
    const doctorsLink = page.locator('a:has-text("Our Doctors")').first();
    await doctorsLink.click();
    await expect(page).toHaveURL(/#doctors/);
  });

  test("3. Internal Pages - Relational Redirects back to Homepage", async ({ page }) => {
    // Navigate directly to a Facility Detail page (increasing timeout to allow dev build compilation)
    await page.goto("/facilities/advanced-operation-theatres", { timeout: 20000 });
    
    // Verify we are on the facility detail page
    await expect(page).toHaveURL(/\/facilities\/advanced-operation-theatres/);
    await expect(page.locator("h1")).toHaveText("Advanced Operation Theatres");

    // Click 'Services' link in header
    const servicesLink = page.locator('nav.hidden.lg\\:flex >> a:has-text("Services")');
    await servicesLink.click();

    // Verify it routes back to homepage with hash target
    await expect(page).toHaveURL(/http:\/\/localhost:3000\/#services/);

    // Go back to Facility Detail page
    await page.goto("/facilities/advanced-operation-theatres", { timeout: 20000 });

    // Click 'Book Appointment' button in header
    const bookCta = page.locator('header >> a:has-text("Book Appointment")').first();
    await bookCta.click();

    // Verify it routes back to homepage booking section
    await expect(page).toHaveURL(/http:\/\/localhost:3000\/#booking/);

    // Go back to Facility Detail page
    await page.goto("/facilities/advanced-operation-theatres", { timeout: 20000 });

    // Click Coordinates Map Pin in header
    const locationPin = page.locator('header >> a[title="Hospital Location & Campus Map"]').first();
    await locationPin.click();

    // Verify it routes back to location section
    await expect(page).toHaveURL(/http:\/\/localhost:3000\/#location/);
  });

  test("4. Intake Form - Error Validations for Empty Submissions", async ({ page }) => {
    // Scroll to the booking form section
    await page.goto("/#booking");

    // Locate the submit button inside the booking card
    const submitBtn = page.locator('#booking button:has-text("Request Appointment")').first();
    
    // Perform empty submit
    await submitBtn.click();

    // Verify validation errors display on fields
    await expect(page.locator("text=Full name must be at least 3 characters.")).toBeVisible();
    await expect(page.locator("text=Please enter a valid email address.")).toBeVisible();
    await expect(page.locator("text=Please enter a valid phone number")).toBeVisible();
    await expect(page.locator("text=Please select a clinical specialty.")).toBeVisible();
    await expect(page.locator("text=Please select an appointment date.")).toBeVisible();
  });

  test("5. Intake Form - Preferred Time slot and WhatsApp Triage Integration", async ({ page }) => {
    await page.goto("/#booking");

    // Fill in required data
    await page.fill('#booking input[name="name"]', "E2E Automated Tester");
    await page.fill('#booking input[name="email"]', "tester@susiram.com");
    await page.fill('#booking input[name="phone"]', "9876543210");
    
    // Select clinical department
    await page.selectOption('#booking select[name="department"]', "Cardiology Sciences");

    // Select doctor (dynamic list)
    await page.selectOption('#booking select[name="doctor"]', "Dr. Adrian Vance, MD, FACC");

    // Set appointment date to tomorrow to bypass date validity validation
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split("T")[0];
    await page.fill('#booking input[name="date"]', dateString);

    // Select preferred time slot
    await page.selectOption('#booking select[name="time"]', "9 to 12am");

    // Fill message
    await page.fill('#booking textarea[name="message"]', "E2E automated testing verification message.");

    // Intercept window.open popup trigger
    const popupPromise = page.context().waitForEvent("page");
    
    // Click submit
    await page.locator('#booking button:has-text("Request Appointment")').click();

    const popup = await popupPromise;

    // Verify redirect URL goes to wa.me or api.whatsapp.com (WhatsApp API endpoint)
    await expect(popup).toHaveURL(/wa\.me|api\.whatsapp\.com/, { timeout: 10000 });
    
    const url = popup.url();
    expect(url).toContain("916384590679"); // Correct WhatsApp hotline

    // Decode URL and replace URL-encoded plus signs with spaces for cleaner assertions
    const decodedUrl = decodeURIComponent(url).replace(/\+/g, " ");
    expect(decodedUrl).toContain("E2E Automated Tester");
    expect(decodedUrl).toContain("Cardiology Sciences");
    expect(decodedUrl).toContain("9 to 12am");
    expect(decodedUrl).toContain("9876543210");
  });
});
