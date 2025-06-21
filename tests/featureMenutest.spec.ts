import {expect} from "@playwright/test";
import { test } from "./baseTest";


test.beforeEach(async({baseTest}) => {
    await baseTest.featureMenu.navigateTo("http://localhost:4200/");
});


test ("open forms layout page", async({baseTest}) => {
    const expectedResult = await baseTest.featureMenu.goToMenuPage("Forms", "Form Layouts", "layouts");
    expect(expectedResult).toBe(true)
});