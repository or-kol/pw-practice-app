import { Page } from "@playwright/test";
import getColors from "get-image-colors";
import { TEST_PATHS } from "../testConfig";
import { Logger } from "../logger";
import { LocatorHelper } from "../locatorHelper";

/**
 * VisualTestingMixin provides advanced visual testing capabilities
 * including screenshots, color validation, and OCR text extraction
 */
export class VisualTestingMixin {
    
    constructor(private page: Page) {}

    /**
     * Measures the duration (in milliseconds) that an element remains visible on the screen.
     * Waits for the element to appear, records the time, then waits for it to disappear.
     * @param selector - The CSS selector of the element to monitor.
     * @param maxWaitTime - Maximum time to wait for element to appear/disappear (default: 30000ms).
     * @returns The duration in milliseconds the element was visible, or -1 if element never appeared or disappeared.
     * @remarks
     * This method is useful for measuring notification durations, popup lifetimes, etc.
     * Returns -1 if the element doesn't appear within maxWaitTime or doesn't disappear within maxWaitTime.
     */
    async measureElementVisibilityDuration(selector: string, maxWaitTime: number = 30000): Promise<number> {
        return (await LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: maxWaitTime });
            const startTime = Date.now();
            let endTime: number;
            
            // Poll until element is no longer visible
            while (await locator.isVisible()) {
                endTime = Date.now();
                if (endTime - startTime > maxWaitTime) break;
                await this.page.waitForTimeout(100); // Small delay to prevent excessive polling
            }
            
            return endTime! - startTime;
        })) as number || -1;
    }

    /**
     * Takes a screenshot of the specified element and compares it to a baseline image.
     * Waits for the element to be visible (timeout: 5000ms).
     * @param selector - The CSS selector of the element to screenshot.
     * @param screenshotName - Name for the screenshot file (without extension).
     * @param options - Optional screenshot configuration.
     * @returns True if screenshot matches baseline, false otherwise.
     * @remarks
     * Uses Playwright's visual comparison. First run will generate baseline images.
     * Subsequent runs will compare against the baseline.
     */
    async takeElementScreenshot(selector: string, screenshotName: string, options?: {threshold?: number, mask?: string[], fullPage?: boolean}): Promise<boolean> {
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: 5000 });
            
            // Configure screenshot options
            const screenshotOptions: any = { threshold: options?.threshold || 0.2, animations: 'disabled' };

            if (options?.mask) {
                screenshotOptions.mask = options.mask.map(maskSelector => this.page.locator(maskSelector));
            }

            await locator.screenshot({ path: `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png` });
            return true;
        });
    }

    /**
     * Takes a screenshot of the entire page and compares it to a baseline image.
     * @param screenshotName - Name for the screenshot file (without extension).
     * @param options - Optional screenshot configuration.
     * @returns True if screenshot matches baseline, false otherwise.
     */
    async takePageScreenshot(screenshotName: string, options?: { threshold?: number, mask?: string[], fullPage?: boolean }): Promise<boolean> {
        try {
            const screenshotOptions: any = { fullPage: options?.fullPage ?? true, animations: 'disabled' };

            if (options?.mask) {
                screenshotOptions.mask = options.mask.map(maskSelector => this.page.locator(maskSelector));
            }

            await this.page.screenshot({ path: `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png`, ...screenshotOptions });
            return true;
        } catch (error) {
            Logger.logError('Page screenshot', error);
            return false;
        }
    }

    /**
     * Waits for an element to be stable (no visual changes) before taking a screenshot.
     * Useful for charts and dynamic content that need time to render completely.
     * @param selector - The CSS selector of the element.
     * @param screenshotName - Name for the screenshot file.
     * @param stabilityTimeMs - Time to wait for element stability (default: 1000ms).
     * @returns True if successful, false otherwise.
     */
    async takeStableElementScreenshot(selector: string, screenshotName: string, stabilityTimeMs: number = 1000): Promise<boolean> {
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: 5000 });
            await this.page.waitForTimeout(stabilityTimeMs);
            await locator.screenshot({ path: `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png`, animations: 'disabled' });
            return true;
        });
    }

    /**
     * Extracts colors from a screenshot and compares them against expected colors with tolerance.
     * Uses the get-image-colors library to extract dominant colors from the image.
     * @param imagePath - Path to the screenshot image file.
     * @param expectedColors - Array of expected RGB color values.
     * @param tolerance - RGB value tolerance for color matching (default: 50).
     * @returns True if all expected colors are found within tolerance, false otherwise.
     * @remarks
     * This method is useful for validating chart colors, theme colors, or any visual elements.
     * Colors are compared with tolerance to account for anti-aliasing and rendering variations.
     */
    async extractAndCompareColorsFromImage(imagePath: string, expectedColors: {r: number, g: number, b: number}[], tolerance: number = 50): Promise<boolean> {
        try {
            const colors = await getColors(imagePath);

            for (const expectedColor of expectedColors) {
                const isFound = colors.some((color: { rgb: () => any; }) => {
                    const rgb = color.rgb();
                    return Math.abs(rgb[0] - expectedColor.r) <= tolerance && 
                           Math.abs(rgb[1] - expectedColor.g) <= tolerance && 
                           Math.abs(rgb[2] - expectedColor.b) <= tolerance;
                });
                
                if (!isFound) {
                    Logger.logWarning(`Color validation failed: Expected [${expectedColor.r}, ${expectedColor.g}, ${expectedColor.b}] not found within tolerance ${tolerance}`);
                    return false;
                }
            }

            return true;
        } catch (error) {
            Logger.logError('Color extraction and comparison', error);
            return false;
        }
    }

    /**
     * Extracts text from an image using OCR (Optical Character Recognition)
     * @param imagePath - Path to the image file
     * @returns Promise<string> - Extracted text from the image
     */
    async extractTextFromImage(imagePath: string): Promise<string> {
        try {
            const { createWorker } = require('tesseract.js');
            const worker = await createWorker();
            
            console.log(`Extracting text from image: ${imagePath}`);
            const { data: { text } } = await worker.recognize(imagePath);
            await worker.terminate();
            
            console.log(`Extracted text: "${text.trim()}"`);
            return text.trim();
        } catch (error) {
            Logger.logError('Text extraction from image', error);
            return '';
        }
    }
}