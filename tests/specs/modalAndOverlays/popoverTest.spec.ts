import { test, expect } from "../../base/baseTest";
import popoverPageData from "../../data/popoverPageData.json";


test.beforeEach(async ({ baseTest }) => {
    await baseTest.popoverPage.goToPopoverPage();
});


test.describe(`Popover tab content validation test suite`, () => {
    const tabs = popoverPageData.TabContent;
    tabs.forEach(({ cardHedline, cardDescription, xfail }) => {
        test(`Popover tab headline: ${cardHedline}`, async ({ baseTest }) => {
            if (xfail) {
                test.fail(true, `Expected failure for popover tab: ${cardHedline}`);
            }

            const result = await baseTest.popoverPage.popoverTabContentValidation(cardHedline, cardDescription);
            expect(result).toBeTruthy();
        });
    });
});



test.describe(`Popover position and content validation test suite`, () => {
    const positions = popoverPageData.popoverPosition.positions;
    const popoverContent = popoverPageData.popoverPosition.popoverContent;

    positions.forEach(({ position, xfail }) => {
        test(`Popover position: ${position}`, async ({ baseTest }) => {
            if (xfail) {
                test.fail(true, `Expected failure for popover position: ${position}`);
            }

            const result = await baseTest.popoverPage.popoverPositionValidation(position, popoverContent);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Simple Popover and content validation test suite`, () => {
    const positions = popoverPageData.simplePopover.popovers;
    const popoverContent = popoverPageData.simplePopover.popoverContent;

    positions.forEach(({ buttonName, isClickNeeded, xfail }) => {
        test(`Popover: ${buttonName} test`, async ({ baseTest }) => {
            if (xfail) {
                test.fail(true, `Expected failure for popover: ${buttonName}`);
            }

            const result = await baseTest.popoverPage.simplePopoverValidation(buttonName, popoverContent, isClickNeeded);
            expect(result).toBeTruthy();
        });
    });
});


const cardInfo = popoverPageData.templateAndComponentPopover.cardInfo;

test.describe(`Popover with tabs and content validation test suite`, () => {
    const tabsInfo = popoverPageData.templateAndComponentPopover.popoverWithTabs;

    cardInfo.forEach(({ cardName, tabsXfail }) => {
        test(`${cardName} Popover tab: ${tabsInfo.buttonName} validation`, async ({ baseTest }) => {
            if (tabsXfail) {
                test.fail(true, `Expected failure for popover tab: ${tabsInfo.buttonName}`);
            }

            const result = await baseTest.popoverPage.popoverWithTabsValidation(cardName, tabsInfo.buttonName, tabsInfo.tab1Headline, 
                tabsInfo.tab1Content, tabsInfo.tab2Headline, tabsInfo.tab2Content);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Popover with form and content validation test suite`, () => {
    const formInfo = popoverPageData.templateAndComponentPopover.popoverWithForm;

    cardInfo.forEach(({ cardName, formXfail }) => {
        test(`${cardName} Popover with form validation`, async ({ baseTest }) => {
            if (formXfail) {
                test.fail(true, `Expected failure for popover with form in card: ${cardName}`);
            }
            const result = await baseTest.popoverPage.popoverWithFormValidation(cardName, formInfo.buttonName, formInfo.textBox1placeholder, 
                formInfo.textBox1input, formInfo.textBox2placeholder, formInfo.textBox2input, formInfo.textBox3placeholder, formInfo.textBox3input, 
                formInfo.button);
            expect(result).toBeTruthy();
        });
    }); 
});


test.describe(`Popover with card and content validation test suite`, () => {
    const cardContentInfo = popoverPageData.templateAndComponentPopover.popoverWithCard;

    cardInfo.forEach(({cardName, cardXfail}) => {
        test(`${cardName} Popover with card validation`, async ({ baseTest }) => {
            if (cardXfail) {
                test.fail(true, `Expected failure for popover with card in: ${cardName}`);
            }

            const result = await baseTest.popoverPage.popoverWithCardValidation(cardName, cardContentInfo.buttonName, cardContentInfo.cardTitle, cardContentInfo.cardContent);
            expect(result).toBeTruthy();
        });
    });
});


test(`Event Debouncing popover test`, async ({ baseTest }) => {
    const result = await baseTest.popoverPage.eventDebouncingValidation();
    expect(result).toBeTruthy();
});
