import {test, expect} from "@playwright/test"

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText("Button Triggering AJAX Request").click();
    testInfo.setTimeout(testInfo.timeout + 2000);   //will modify the test timeout for all tests in this page.
})

test("auto waiting", async({page}) => {
    const succesButton = page.locator(".bg-success");
    
    //await succesButton.click();

    //const succesButtonText = await succesButton.textContent();
    //expect(succesButtonText).toEqual("Data loaded with AJAX get request.");

    //const succesButtonText = await succesButton.allTextContents(); //will fail because allTextContents method does not have waiting process.
    //await succesButton.waitFor({state: "attached"});
    //const succesButtonText = await succesButton.allTextContents();
    //expect(succesButtonText).toEqual(["Data loaded with AJAX get request."]);
    //expect(succesButtonText).toContain("Data loaded with AJAX get request.");


    await expect(succesButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000}); //default timeout for toHaveText method is 5 sec
                                                                                                   //so it will fail. in rer for it to pass we need
                                                                                                   //to set timeout to 20 sec.
    
})


test("alternative weits", async({page}) => {
    const succesButton = page.locator(".bg-success");

    //wait for element:
    //await page.waitForSelector(".bg-success");

    //wait for particular responce:
    //await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

    //wait for network calls to be completed (NOT RECOMENDED): 
    await page.waitForLoadState("networkidle");
    const succesButtonText = await succesButton.allTextContents();
    expect(succesButtonText).toContain("Data loaded with AJAX get request.");
})



test("timeouts", async({page}) => {
    //test.setTimeout(10000); //overide test timeout
    //test.slow() //will nultiply the default test timeout by 3.
    const succesButton = page.locator(".bg-success");
    
    await succesButton.click({timeout: 16000}); //overide action timeout

})