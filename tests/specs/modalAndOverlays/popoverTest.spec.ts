import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../page_objects/pageManager";
import path from "path";

const popoverPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/popoverPageData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");
const cardInfo = popoverPageData.templateAndComponentPopover.cardInfo;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.popoverPage.goToPopoverPage();
});


test.describe(`Popover tab content validation test suite`, () => {
    const tabs = popoverPageData.TabContent;
    tabs.forEach(({ cardHedline, cardDescription }) => {
        test(`Popover tab headline: ${cardHedline}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.popoverPage.popoverTabContentValidation(cardHedline, cardDescription);
        });
    });
});

test.describe(`Popover position and content validation test suite`, () => {
    const positions = popoverPageData.popoverPosition.positions;
    const popoverContent = popoverPageData.popoverPosition.popoverContent;

    positions.forEach(({ position }) => {
        test(`Popover position: ${position}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.popoverPage.popoverPositionValidation(position, popoverContent);
        });
    });
});

test.describe(`Simple Popover and content validation test suite`, () => {
    const positions = popoverPageData.simplePopover.popovers;
    const popoverContent = popoverPageData.simplePopover.popoverContent;

    positions.forEach(({ buttonName, isClickNeeded }) => {
        test(`Popover: ${buttonName} test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.popoverPage.simplePopoverValidation(buttonName, popoverContent, isClickNeeded);
        });
    });
});

test.describe(`Popover with tabs and content validation test suite`, () => {
    const tabsInfo = popoverPageData.templateAndComponentPopover.popoverWithTabs;

    cardInfo.forEach(({ cardName }) => {
        test(`${cardName} Popover tab: ${tabsInfo.buttonName} validation`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.popoverPage.popoverWithTabsValidation(cardName, tabsInfo.buttonName, tabsInfo.tab1Headline, tabsInfo.tab1Content, tabsInfo.tab2Headline, tabsInfo.tab2Content);
        });
    });
});

test.describe(`Popover with form and content validation test suite`, () => {
    const formInfo = popoverPageData.templateAndComponentPopover.popoverWithForm;

    cardInfo.forEach(({ cardName }) => {
        test(`${cardName} Popover with form validation`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.popoverPage.popoverWithFormValidation(cardName, formInfo.buttonName, formInfo.textBox1placeholder, formInfo.textBox1input, formInfo.textBox2placeholder, formInfo.textBox2input, formInfo.textBox3placeholder, formInfo.textBox3input, formInfo.button);
        });
    }); 
});

test.describe(`Popover with card and content validation test suite`, () => {
    const cardContentInfo = popoverPageData.templateAndComponentPopover.popoverWithCard;

    cardInfo.forEach(({cardName}) => {
        test(`${cardName} Popover with card validation`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.popoverPage.popoverWithCardValidation(cardName, cardContentInfo.buttonName, cardContentInfo.cardTitle, cardContentInfo.cardContent);
        });
    });
});


test(`Event Debouncing popover test`, async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.popoverPage.eventDebouncingValidation();
});
