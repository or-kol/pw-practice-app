import {test, expect} from "@playwright/test"

test("drag and drop with iframe", async({page}) => {
    await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
    
    const frame = page.frameLocator("[rel-title='Photo Manager'] iframe");
    const trash = frame.locator("#trash")
    await frame.locator("li", {hasText: "High Tatras 2"}).dragTo(trash);
    
    await expect(trash).toContainText("High Tatras 2");


    // more presice control
    await frame.locator("li", {hasText: "High Tatras 4"}).hover();
    await page.mouse.down();
    await trash.hover();
    await page.mouse.up();

    await expect(trash).toContainText("High Tatras 4");

})