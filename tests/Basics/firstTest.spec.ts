import {test, expect} from "@playwright/test"
import { timeout } from "rxjs-compat/operator/timeout";

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
})


test("basic browser operations", async({page}) => {
    await page.goto("http://uitestingplayground.com/ajax");
    await page.goto("http://localhost:4200/");
    await page.goBack();
    await page.goForward();
    await page.reload();
    console.log(await page.title());
    console.log(page.url());    
})


test.describe("test suite 1", () => {
    test("first suite 1 test", () => {

    })

    test("second suite 1 test", () => {

    })

    test("third suite 1 test", () => {

    })
})




/*
test("locator syntax rules", async({page}) => {
    //by tag name:
    page.locator("input"); // this is not unique.

    //by id:
    page.locator("#id_value");

    //by class:
    page.locator(".class_value"); //singular class.
    page.locator('class="all_classes_value"'); //all classes assign to element.

    //by attribute:
    page.locator('[attribute="attribute_value"]');

    //combine different selectors:
    page.locator('input[attribute="attribute_value"]'); //no space between locators: input & [attribute="attribute_value"]

    //by partial text match:
    page.locator(':text("partial_text")');

    //by exact text match:
    page.locator(':text-is("exact_text")'); // will find only elements with the exact text
                                            // for example if we searched the word "Using"
                                            // it will find element with this word and not
                                            // for example "Using the Grid". It's case sensitive.


})



test("user facing locators", async({page}) => {
    await page.getByRole("textbox", {name: "email"}).first().click(); //not recomended to use "first()" - it can be changed
    await page.getByRole("button", {name: "Sign in"}).first().click();

    await page.getByLabel("Email").first().click();

    await page.getByPlaceholder("Jane Doe").click();
    
    await page.getByText("Using the Grid").click();
    
    await page.getByTitle("IoT Dashboard").click();

    //await page.getByTestId("inputWebsite").click(); //Need to add ta designated attribute to the element called "data-testid"
})




test("locating child elements", async({page}) => {
    await page.locator("nb-card nb-radio :text-is('Option 1')").click(); // each element after the spave is child to the previous element

    await page.locator("nb-card").getByRole("button", {name: "Sign in"}).first().click();

    await page.locator("nb-card").nth(3).getByRole("button").click(); //not recomended to use index "nth()" - it can be changed.
})


test("locating parent element", async({page}) => {
    await page.locator("nb-card", {hasText: "Using the Grid"}).getByRole("textbox", {name: "email"}).click(); //first find the parent
                                                                                                              //and then fund the
                                                                                                              //desired element by role

    await page.locator("nb-card", {has: page.locator("#inputEmail1")}).getByRole("textbox", {name: "email"}).click();

    await page.locator("nb-card").filter({hasText: "Basic form"}).getByRole("textbox", {name: "email"}).click();
    
    await page.locator("nb-card").filter({has: page.locator(".status-danger")}).getByRole("textbox", {name: "Password"}).click();

    await page.locator("nb-card").filter({has: page.locator("nb-checkbox")}).filter({hasText: "Sign in"}).getByRole("textbox", {name: "Password"}).click();

    await page.locator("nb-card").filter({has: page.locator("nb-checkbox")}).filter({hasText: "Sign in"}).getByRole("textbox", {name: "Password"}).click();
})



test("reusing locators", async({page}) => {
    const basicForm = page.locator("nb-card").filter({hasText: "Basic form"});
    await basicForm.getByRole("textbox", {name: "email"}).fill("test@test.com");
    await basicForm.getByRole("textbox", {name: "Password"}).fill("asd123");
    await basicForm.locator("nb-checkbox").click();
    await basicForm.getByRole("button").click();

    await expect(basicForm.getByRole("textbox", {name: "email"})).toHaveValue("test@test.com");
})




test("extract values", async({page}) => {
    const basicForm = page.locator("nb-card").filter({hasText: "Basic form"});

    //single text value:
    const buttonText = await basicForm.locator('button').textContent();
    expect(buttonText).toEqual("Submit");

    //all text values:
    const allRadioButtonsLabels = await page.locator("nb-radio").allTextContents();
    expect(allRadioButtonsLabels).toContain("Option 1");
    console.log(allRadioButtonsLabels);
    
    //input value:
    const emailField = basicForm.getByRole("textbox", {name: "email"});
    await emailField.fill("test@test.com");
    const emailValue = await emailField.inputValue();
    
    expect(emailValue).toEqual("test@test.com");

    //attribute value:
    const placeHolderValue = await emailField.getAttribute("placeholder");
    expect(placeHolderValue).toEqual("Email");
})



test("assertions", async({page}) => {
    const basicFormButton = page.locator("nb-card").filter({hasText: "Basic form"}).locator("button");

    //general assertions:
    const value = 5;
    expect(value).toEqual(5);

    const basicFormButtonLabel = await basicFormButton.textContent();
    expect(basicFormButtonLabel).toEqual("Submit");


    //locator asertion:
    await expect(basicFormButton).toHaveText("Submit");


    //soft assertion:
    await expect.soft(basicFormButton).toHaveText("Submit5");
    await basicFormButton.click();

})



test("auto waiting", async({page}) => {
    const basicFormButton = page.locator("nb-card").filter({hasText: "Basic form"}).locator("button");

    //general assertions:
    const value = 5;
    expect(value).toEqual(5);

    const basicFormButtonLabel = await basicFormButton.textContent();
    expect(basicFormButtonLabel).toEqual("Submit");


    //locator asertion:
    await expect(basicFormButton).toHaveText("Submit");


    //soft assertion:
    await expect.soft(basicFormButton).toHaveText("Submit5");
    await basicFormButton.click();

})

*/



