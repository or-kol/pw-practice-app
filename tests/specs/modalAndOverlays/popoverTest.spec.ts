import { test } from "../../page_objects/utils/browserSetup"
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const popoverPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/popoverPageData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.popoverPage.goToPopoverPage();
});


test.describe(`Popover tab content validation test suite`, () => {
    const tabs = popoverPageData.TabContent;
    tabs.forEach(({ cardHedline, cardDescription, xfail }) => {
        test(`Popover tab headline: ${cardHedline}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for popover tab: ${cardHedline}`);
            };
            await pageManager.popoverPage.popoverTabContentValidation(cardHedline, cardDescription);
        });
    });
});


test.describe(`Popover position and content validation test suite`, () => {
    const positions = popoverPageData.popoverPosition.positions;
    const popoverContent = popoverPageData.popoverPosition.popoverContent;

    positions.forEach(({ position, xfail }) => {
        test(`Popover position: ${position}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for popover position: ${position}`);
            };
            await pageManager.popoverPage.popoverPositionValidation(position, popoverContent);
        });
    });
});


test.describe(`Simple Popover and content validation test suite`, () => {
    const positions = popoverPageData.simplePopover.popovers;
    const popoverContent = popoverPageData.simplePopover.popoverContent;

    positions.forEach(({ buttonName, isClickNeeded, xfail }) => {
        test(`Popover: ${buttonName} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for popover: ${buttonName}`);
            };
            await pageManager.popoverPage.simplePopoverValidation(buttonName, popoverContent, isClickNeeded);
        });
    });
});


const cardInfo = popoverPageData.templateAndComponentPopover.cardInfo;

test.describe(`Popover with tabs and content validation test suite`, () => {
    const tabsInfo = popoverPageData.templateAndComponentPopover.popoverWithTabs;

    cardInfo.forEach(({ cardName, tabsXfail }) => {
        test(`${cardName} Popover tab: ${tabsInfo.buttonName} validation`, async () => {
            if (tabsXfail) {
                test.fail(true, `Expected failure for popover tab: ${tabsInfo.buttonName}`);
            }
            await pageManager.popoverPage.popoverWithTabsValidation(cardName, tabsInfo.buttonName, tabsInfo.tab1Headline, tabsInfo.tab1Content, tabsInfo.tab2Headline, tabsInfo.tab2Content);
        });
    });
});


test.describe(`Popover with form and content validation test suite`, () => {
    const formInfo = popoverPageData.templateAndComponentPopover.popoverWithForm;

    cardInfo.forEach(({ cardName, formXfail }) => {
        test(`${cardName} Popover with form validation`, async () => {
            if (formXfail) {
                test.fail(true, `Expected failure for popover with form in card: ${cardName}`);
            }
            await pageManager.popoverPage.popoverWithFormValidation(cardName, formInfo.buttonName, formInfo.textBox1placeholder, formInfo.textBox1input, formInfo.textBox2placeholder, formInfo.textBox2input, formInfo.textBox3placeholder, formInfo.textBox3input, formInfo.button);
        });
    }); 
});


test.describe(`Popover with card and content validation test suite`, () => {
    const cardContentInfo = popoverPageData.templateAndComponentPopover.popoverWithCard;

    cardInfo.forEach(({cardName, cardXfail}) => {
        test(`${cardName} Popover with card validation`, async () => {
            if (cardXfail) {
                test.fail(true, `Expected failure for popover with card in: ${cardName}`);
            }
            await pageManager.popoverPage.popoverWithCardValidation(cardName, cardContentInfo.buttonName, cardContentInfo.cardTitle, cardContentInfo.cardContent);
        });
    });
});


test(`Event Debouncing popover test`, async () => {
    await pageManager.popoverPage.eventDebouncingValidation();
});
