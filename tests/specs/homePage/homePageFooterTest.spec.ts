import {test, expect} from "../../base/baseTest";
import homePageFooterData from "../../data/homePageFooterData.json"


test(`Rights reseved text validation`, async ({baseTest}) => {
    const result = await baseTest.homePageFooter.rightsReservedText();
    expect(result).toBeTruthy();
});


test(`Aveco rights url functionality`, async ({baseTest}) => {
    const result = await baseTest.homePageFooter.urlAvecoFunctionality();
    expect(result).toBeTruthy();
});


test.describe(`Social networks navigation`, () => {
    homePageFooterData.socialMedias.forEach((socialMedia) => {
        test(`Navigate to ${socialMedia} social Network`, async({baseTest}) => {
            const result = await baseTest.homePageFooter.socialButtonsFunctionality(socialMedia);
            expect(result).toBeTruthy();
        })
    })
})