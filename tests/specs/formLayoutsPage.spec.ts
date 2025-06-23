import { test } from "../base/baseTest";
import { expect } from "@playwright/test";


test.beforeEach(async({baseTest}) => {
    await baseTest.featureMenu.navigateTo('http://localhost:4200/pages/forms/layouts');
})


test("fill inline form", async({baseTest}) => {
    const wasSabmitted = await baseTest.formLayout.fillInlineForm("Etaoin Shrdlu", "test@test.com");
    expect(wasSabmitted).toBe(true);
});


test("fill using the grid form", async({baseTest}) => {
    const wasSabmitted = await baseTest.formLayout.fillUsingTheGridForm("test@test.com", "12345");
    expect(wasSabmitted).toBe(true);
});

test("fill basic form", async({baseTest}) => {
    const wasSabmitted = await baseTest.formLayout.fillBasicForm("test@test.com", "12345");
    expect(wasSabmitted).toBe(true);
});

test("fill block form", async({baseTest}) => {
    test.fail(true, "This test is expected to fail, as the form is not implemented yet.");

    const wasSabmitted = await baseTest.formLayout.fillBlockForm("Etaoin", "Shrdlu", "test@test.com", "wwww.test.com");
    expect(wasSabmitted).toBe(true);
});

test("fill form without labels", async({baseTest}) => {
    const wasSabmitted = await baseTest.formLayout.fillFormWithoutLabels("test@test.com", "Subject of the message", "A very long message is written here!");
    expect(wasSabmitted).toBe(true);
});

test("fill horizontal form", async({baseTest}) => {
    const wasSabmitted = await baseTest.formLayout.fillHorizonttalForm("test@test.com", "Password123");
    expect(wasSabmitted).toBe(true);
});

