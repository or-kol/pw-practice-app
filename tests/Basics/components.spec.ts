import {test, expect} from "@playwright/test"
import { constants } from "buffer";


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
})


test.describe("form layouts page", () => {
    test.beforeEach(async({page}) => {
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
    })

    test("input fields", async({page}) => {
        const usingTheGridEmail = page.locator("nb-card", {hasText: "Using the Grid"}).getByPlaceholder("Email");

        await usingTheGridEmail.fill("test@test.com");

        await usingTheGridEmail.clear();
        await usingTheGridEmail.pressSequentially("test@test.com", {delay: 500}); //delay is optional to simulate typing

        //generic assertion:
        const actualResult = await usingTheGridEmail.inputValue();
        expect(actualResult).toEqual("test@test.com");

        //locator assetion:
        await expect(usingTheGridEmail).toHaveValue("test@test.com");
    })


    test("radio button", async({page}) => {
        const usingTheGridRadioButtons = page.locator("nb-card", {hasText: "Using the Grid"}).locator("nb-radio");

        //method 1:
        await usingTheGridRadioButtons.getByLabel("Option 1").check({force: true}); //element is "visually-hidden" - this is why we need "force: true"

        //generic assertion:
        const actualResult1 = await usingTheGridRadioButtons.getByLabel("Option 1").isChecked();
        expect(actualResult1).toEqual(true);

        //locator assetion:
        await expect(usingTheGridRadioButtons.getByLabel("Option 1")).toBeChecked();


        //method 2:
        await usingTheGridRadioButtons.getByRole("radio", {name: "Option 2"}).check({force: true});

        //generic assertion:
        const actualResult2 = await usingTheGridRadioButtons.getByLabel("Option 1").isChecked();
        expect(actualResult2).toEqual(false);

        //locator assetion:
        expect(await usingTheGridRadioButtons.getByLabel("Option 1").isChecked()).toBeFalsy();
    })
})


test.describe("toastr", () => {
    test.beforeEach(async({page}) => {
        await page.getByText("Modal & Overlays").click();
        await page.getByText("Toastr").click();
    })

    test("checkboxes", async({page}) => {
        const toastrHideOnClick = page.getByRole("checkbox", {name: "Hide on click"});
        const toastrPreventArising = page.getByRole("checkbox", {name: "Prevent arising of duplicate toast"});

        // check/uncheck ceckbox
        await toastrHideOnClick.uncheck({force: true});
        await toastrPreventArising.check({force: true});

        //generic assertion:
        const actualResult1 = await toastrHideOnClick.isChecked();
        const actualResult2 = await toastrPreventArising.isChecked();
        expect(actualResult1).toEqual(false);
        expect(actualResult2).toEqual(true);

        //locator assetion:
        expect(await toastrHideOnClick.isChecked()).toBeFalsy;
        expect(await toastrHideOnClick.isChecked()).toBeTruthy;


        // check/uncheck all ceckboxes:
        const toastrAllCheckboxes = page.getByRole("checkbox");
        for (const box of await toastrAllCheckboxes.all()){
            await box.check({force: true});
            expect(await box.isChecked()).toBeTruthy();
        }

        for (const box of await toastrAllCheckboxes.all()){
            await box.uncheck({force: true});
            expect(await box.isChecked()).toBeFalsy();
        }
    })
})




test("lists and dropdowns", async({page}) => {
    const themeDropdown = page.locator("ngx-header nb-select");
    
    // check 1 theme:
    /*
    await themeDropdown.click();
    await page.locator("nb-option-list nb-option", {hasText: "Cosmic"}).click(); //this is shorter the the next option
    const header = page.locator("nb-layout-header");
    await expect(header).toHaveCSS("Background-color", "rgb(50, 50, 89)");
    */
    
    // if we want to validate we got all the values.
    //const themeList = page.locator("nb-option-list nb-option");
    // expect(themeList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);


    //check all themes
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    for (const color in colors){
        await themeDropdown.click();
        await page.locator("nb-option-list nb-option").filter({hasText: color}).click();
        const header = page.locator("nb-layout-header");
        await expect(header).toHaveCSS("Background-color", colors[color]);
    }
})



test("tooltips", async({page}) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();

    const tooltipPlacementsToolptips = page.locator("nb-card", {hasText: "Tooltip Placements"});
    await tooltipPlacementsToolptips.getByRole("button", {name: "Top"}).hover();
    
    const tooltip = await page.locator("nb-tooltip").textContent();
    expect(tooltip).toEqual("This is a tooltip");
})



test("dialog boxes", async({page}) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    page.on("dialog", dialog => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?");

        dialog.accept();
    })

    await page.getByRole("table").locator("tr", {hasText: "mdo@gmail.com"}).locator(".nb-trash").click();

    await expect(page.locator("table tr").first()).not.toHaveText("mdo@gmail.com");
})


test.describe("web tables", () => {
    test.beforeEach("go to tables", async({page}) => {
        await page.getByText("Tables & Data").click();
        await page.getByText("Smart Table").click();
    })


    test("edit row", async({page}) => {
        const targetRow = page.locator("tr").filter({ hasText: "twitter@outlook.com" });
        await targetRow.locator(".nb-edit").click();

        const editedTargetRow = page.locator("input-editor").getByPlaceholder("Age");// once we clicked the edit button the 
                                                                                      // element signture in the browser changed.
                                                                                      // this is why we need a different locator.
        await editedTargetRow.clear();
        await editedTargetRow.fill("25");

        await page.locator(".nb-checkmark").click();

        expect(await targetRow.locator("td").nth(6).textContent()).toEqual("25");
    })


    test("select row by column value", async({page}) => {
        await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
        
        const targetRow = page.getByRole("row").filter({has: page.locator("td").nth(1).getByText("11")});
        await targetRow.locator(".nb-edit").click();

        const editedTargetRecord = page.locator("input-editor").getByPlaceholder("E-mail");
        await editedTargetRecord.clear();
        await editedTargetRecord.fill("test@test.com");
        await page.locator(".nb-checkmark").click();

        expect(await targetRow.locator("td").nth(5).textContent()).toEqual("test@test.com");
    })


    test("loop through tabale rows", async({page}) => {
        const ages = ["20", "30", "40", "200"];
        for (let age of ages){
            const filterAge = page.locator("input-filter").getByPlaceholder("Age");
            await filterAge.clear();
            await filterAge.fill(age);
            await page.waitForTimeout(500);

            const getRows = page.locator("tbody tr");
            for (let row of await getRows.all()){
                const ageValue = await row.locator("td").last().textContent();

                if (ageValue.trim() === "No data found"){
                    console.log(`No rows found for age ${age}, skipping...`);
                }
                else {
                    expect(ageValue).toEqual(age);
                }
            }
        }
    })
})


test("date pickers", async({page}) => {
    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    const calendarInput = page.getByPlaceholder("Form Picker");
    await calendarInput.click();

    let date = new Date();
    date.setDate(date.getDate() + 7);
    const expectedDate = date.getDate().toString();
    const expectedMonth = date.toLocaleString("En-US", {month: "short"});
    const expectedYear = date.getFullYear().toString();
    const expecedResult = `${expectedMonth} ${expectedDate}, ${expectedYear}`;
    console.log(expecedResult);

    await page.locator("nb-calendar-view-mode button").click();
    await page.locator(".year-cell").getByText(date.getFullYear().toString()).click();
    await page.locator(".month-cell").getByText(expectedMonth.toUpperCase()).click();
    await page.locator(".day-cell:not(.bounding-month)").getByText(expectedDate , {exact: true}).click();

    await expect(calendarInput).toHaveValue(expecedResult);
})



test("sliders", async({page}) => {
    
    //update attribute:
    const tempGauge = page.locator("[tabtitle='Temperature'] ngx-temperature-dragger circle");
    await tempGauge.evaluate(node => {
        node.setAttribute("cx", "232.63");
        node.setAttribute("cy", "232.63");
    })
    await tempGauge.click();

    await expect(page.locator("[tabtitle='Temperature'] ngx-temperature-dragger")).toContainText("30");
    

    //mouse movement:
    page.reload();
    const tempbox = page.locator("[tabtitle='Temperature'] ngx-temperature-dragger");
    await tempbox.scrollIntoViewIfNeeded();     //in order to use the mouse movment the element must be in view.

    const box = await tempbox.boundingBox();    //defining x, y axesses to easy mouse movewment.
    const x = box.x + (box.width / 2);
    const y = box.y + (box.height / 2);

    await page.mouse.move(x, y);                // set mouse to the midle of the box
    await page.mouse.down();                    // click left button on of the mouse 
    await page.mouse.move(x - 100, y);          // move mouse right
    await page.mouse.move(x - 100, y + 100);    // move mouse down
    await page.mouse.up();                      // release mouse click

    await expect(tempbox).toContainText('13');
})






















