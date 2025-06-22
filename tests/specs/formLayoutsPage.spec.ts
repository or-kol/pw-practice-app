import { test } from "../base/baseTest";
import { expect } from "@playwright/test";


test.beforeEach(async({baseTest}) => {
    await baseTest.featureMenu.navigateTo('http://localhost:4200/pages/forms/layouts');
})

test("fill Using the grid form", async({baseTest}) => {
    const wasSabmitted = await baseTest.formLayout.fillUsingTheGridForm("test@test.com", "12345");
    expect(wasSabmitted).toBe(true);
});


