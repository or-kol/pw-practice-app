import { test, expect } from "../../base/baseTest";
import { TEST_PATHS } from "../../config/test-config";

const toastsPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/tooltipPageData.json`) as any;


test.beforeEach(async ({ baseTest }) => {
    await baseTest.tooltipPage.goToTooltipPage();
});

test.describe(`Tooltip tab content validation test suite`, () => {
    const tooltipContent = toastsPageData.tooltipContent;
    const tooltipReflections = toastsPageData.tooltipReflection;

    tooltipReflections.forEach((Reflection) => {
        test(`Tooltip content: ${Reflection.buttonName} test`, async ({ baseTest }) => {
            if (Reflection.xfail) {
                test.fail(true, `Expected failure for tooltip content: ${Reflection.buttonName}`);
            };

            const result = await baseTest.tooltipPage.tooltipTabContentValidation(tooltipContent, Reflection.buttonName);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Tooltip icon validation test suite`, () => {
    const tooltipReflections = toastsPageData.tooltipsIcons;
    
    tooltipReflections.forEach((icon) => {
        test(`Tooltip icon: ${icon.icon} test`, async ({ baseTest }) => {
            if (icon.xfail) {
                test.fail(true, `Expected failure for tooltip icon: ${icon.icon}`);
            };

            const result = await baseTest.tooltipPage.tooltipIconValidation(icon.icon);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Tooltip position validation test suite`, () => {
    const tooltipPositions = toastsPageData.tooltipPositions;
    tooltipPositions.forEach((position) => {
        test(`Tooltip position: ${position.position} test`, async ({ baseTest }) => {
            if (position.xfail) {
                test.fail(true, `Expected failure for tooltip position: ${position.position}`);
            };

            const result = await baseTest.tooltipPage.tooltipPositionValidation(position.position, position.classValidation);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Tooltip color validation test suite`, () => {
    const tooltipBackgroundColors = toastsPageData.tooltipBackgroundColors;
    tooltipBackgroundColors.forEach((color) => {
        test(`Tooltip type: ${color.type} test`, async ({ baseTest }) => {
            if (color.xfail) {
                test.fail(true, `Expected failure for tooltip type: ${color.type}`);
            };
            const result = await baseTest.tooltipPage.tooltipColorValidation(color.type, color.color);
            expect(result).toBeTruthy();
        });
    });
});


