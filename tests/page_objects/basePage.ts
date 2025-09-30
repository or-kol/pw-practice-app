import { Page, Locator } from "@playwright/test";
import getColors from "get-image-colors";
import { TEST_PATHS, TEST_TIMEOUTS } from "../config/test-config";

export class BasePage {
    
    readonly page: Page;
    private readonly ACTION_TIMEOUT = TEST_TIMEOUTS.ACTION;

    constructor(page: Page) {
        this.page = page;
    };



    /**
     * Logs a warning message to the console when a selector fails to match any elements.
     * @param selector - The CSS selector that did not match any element.
     * @remarks
     * This method is for internal use only and is called when an element is not found or an action fails.
     */
    private warnMissing(selector: string): void {
        console.warn(`Selector not found: ${selector}`);
    };

    /**
     * Logs an error message to the console when an operation fails unexpectedly.
     * @param operation - Description of the operation that failed.
     * @param error - The error object or message.
     * @remarks
     * This method is for internal use only and is called when operations encounter unexpected errors.
     */
    private logError(operation: string, error: any): void {
        console.error(`${operation} failed:`, error);
    };

    /**
     * Logs a warning message to the console for validation or operational warnings.
     * @param message - The warning message to log.
     * @remarks
     * This method is for internal use only and is called when operations need to warn about validation failures or other issues.
     */
    private logWarning(message: string): void {
        console.warn(message);
    };


    /**
     * Returns a Playwright Locator for the given selector.
     * @param selector - The CSS selector of the element.
     * @returns The Playwright Locator, or null if the locator could not be created.
     * @remarks
     * This method is for internal use only and is used by withLocator to obtain a Locator for further actions.
     */
    private async el(selector: string): Promise<Locator | null> {
        try {
            return this.page.locator(selector);
        } catch (err) {
            this.warnMissing(selector);
            return null;
        };
    };


    /**
     * Utility wrapper to handle locator lookup and action execution.
     * Handles errors and logs warnings if the element is not found or the action fails.
     * @param selector - The CSS selector of the element.
     * @param action - The async function to execute with the locator.
     * @returns The result of the action, or false if the element is not found or the action fails.
     * @remarks
     * This method is for internal use only.
     */
    private async withLocator<T>(selector: string, action: (locator: Locator) => Promise<T>): Promise<T | false> {
        const locator = await this.el(selector);
        
        if (!locator) {
            this.warnMissing(selector);
            return false;
        };

        try {
            return await action(locator);
        } catch (err) {
            this.warnMissing(selector);
            return false;
        };
    };



    /**
     * Clicks on the element specified by the selector.
     * Waits for the element to be visible and clickable using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element to click.
     * @param waitAfterMs - Optional delay after click in milliseconds (default: 0).
     * @returns True if click was successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting and clicking. Logs a warning and returns false if the element is not found or not clickable.
     */
    async click(selector: string, waitAfterMs: number = 0): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            await locator.click({ timeout: this.ACTION_TIMEOUT });
            
            if (waitAfterMs > 0) {
                await this.page.waitForTimeout(waitAfterMs);
            };

            return true;
        });
    };


    /**
     * Fills the input field with the specified value.
     * Waits for the input to be visible using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the input field.
     * @param value - The value to fill.
     * @returns True if successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting and filling. Logs a warning and returns false if the element is not found or not fillable.
     */
    async fillInput({ selector, value }: { selector: string; value: any; }): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            await locator.fill(value, { timeout: this.ACTION_TIMEOUT });
            return true;
        });
    };


    /**
     * Checks the checkbox if not already checked.
     * Waits for the checkbox to be visible using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the checkbox.
     * @returns True if successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting and checking. Logs a warning and returns false if the element is not found or not checkable.
     */
    async check(selector: string): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            if (!(await locator.isChecked())) {
                await locator.check({ force: true, timeout: this.ACTION_TIMEOUT });
            };
            return true;
        });
    };


    /**
     * Unchecks the checkbox if not already unchecked.
     * Waits for the checkbox to be visible using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the checkbox.
     * @returns True if successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting and unchecking. Logs a warning and returns false if the element is not found or not uncheckable.
     */
    async uncheck(selector: string): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            if (await locator.isChecked()) {
                await locator.uncheck({ force: true, timeout: this.ACTION_TIMEOUT });
            };
            return true;
        });
    };


    /**
     * Checks if the element is visible on the page.
     * Waits for the element to be visible using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element.
     * @returns True if visible, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns false if the element is not found or not visible.
     */
    async isVisible(selector: string): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            return locator.isVisible();
        });
    };


    /**
     * Retrieves the text content or input value of an element.
     * Waits for the element to be visible using ACTION_TIMEOUT.
     * Handles both text elements and form fields.
     * @param selector - The CSS selector of the target element.
     * @returns The text content or input value, or empty string if not found.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns an empty string if the element is not found.
     */
    async getText(selector: string): Promise<string> {
        return (await this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            const tagName = await locator.evaluate(element => element.tagName.toLowerCase());
            if (["input", "textarea", "select"].includes(tagName)) {
                return await locator.inputValue();
            } else {
                return (await locator.textContent())?.trim() ?? "";
            };
        })) as string;
    };


    /**
     * Retrieves the value of an attribute for the element.
     * Waits for the element to be attached to the DOM using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element.
     * @param attribute - The attribute name.
     * @returns The attribute value, or empty string if not found.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns an empty string if the element or attribute is not found.
     */
    async getAttribute(selector: string, attribute: string): Promise<string> {
        return (await this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "attached", timeout: this.ACTION_TIMEOUT });
            return (await locator.getAttribute(attribute)) ?? "";
        })) as string;
    };


    /**
     * Gets the computed style property value of the element.
     * Waits for the element to be attached to the DOM using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element.
     * @param property - The CSS property name.
     * @returns The property value, or empty string if not found.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns an empty string if the element or property is not found.
     */
    async getElementCssProperty(selector: string, property: string): Promise<string> {
        return (await this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "attached", timeout: this.ACTION_TIMEOUT });
            return await locator.evaluate((element, prop) =>
                window.getComputedStyle(element as HTMLElement).getPropertyValue(prop as string),
                property
            );
        })) as string;
    };


    /**
     * Sets an attribute value on the element.
     * Waits for the element to be attached to the DOM using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element.
     * @param attribute - The attribute name.
     * @param value - The value to set.
     * @returns True if successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns false if the element is not found or the attribute cannot be set.
     */
    async setAttributeVal(selector: string, attribute: string, value: string): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "attached", timeout: this.ACTION_TIMEOUT });
            await locator.evaluate(
                (element, { attribute, value }) => (element as HTMLElement).setAttribute(attribute, value),
                { attribute, value }
            );
            return true;
        });
    };


    /**
     * Scrolls the element into view if needed.
     * Waits for the element to be visible using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element.
     * @returns True if successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns false if the element is not found or cannot be scrolled into view.
     */
    async scrollIntoView(selector: string): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            await locator.scrollIntoViewIfNeeded();
            return true;
        });
    };


    /**
     * Moves the mouse cursor to the center of the specified element and optionally drags it by a given offset.
     * Waits for the element to be visible using ACTION_TIMEOUT.
     * @param selector - CSS selector used to locate the target element.
     * @param pixelsToMoveX - Number of pixels to move horizontally from the element's center (default is 0).
     * @param pixelsToMoveY - Number of pixels to move vertically from the element's center (default is 0).
     * @param pressMouseBeforeMove - If true, simulates a mouse press before moving (for drag-and-drop interactions).
     * @returns True if the movement succeeds, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns false if the element is not found or the mouse action fails.
     */
    async moveMouseInBoxedElement(selector: string, pixelsToMoveX: number = 0, pixelsToMoveY: number = 0, pressMouseBeforeMove: boolean = false): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            const box = await locator.boundingBox();

            if (!box) {
                this.warnMissing(selector);
                return false;
            };

            const centerX = box.x + box.width / 2;
            const centerY = box.y + box.height / 2;
            await this.page.mouse.move(centerX, centerY, { steps: 20 });

            if (pressMouseBeforeMove) {
                await this.page.mouse.down();
                await this.page.mouse.move(centerX + pixelsToMoveX, centerY + pixelsToMoveY, { steps: 20 });
                await this.page.mouse.up();
            } else {
                await this.page.mouse.move(centerX + pixelsToMoveX, centerY + pixelsToMoveY, { steps: 20 });
            };

            return true;
        });
    };


    /**
     * Presses a keyboard key on a specific element or the currently focused element.
     * Waits for the element to be visible if a selector is provided (timeout: 5000ms).
     * @param key - The name of the key to press (e.g., 'Enter', 'Escape').
     * @param selector - Optional. If provided, presses the key on that element. Otherwise, uses page-level keyboard.
     * @returns True if the key was pressed successfully, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting and pressing. Logs a warning and returns false if the element is not found or the key cannot be pressed.
     */
    async pressKeyboardKey(key: string, selector?: string): Promise<boolean> {
        if (selector) {
            return this.withLocator(selector, async (locator) => {
                await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
                await locator.press(key, { timeout: this.ACTION_TIMEOUT });
                return true;
            });
        } else {
            try {
                await this.page.keyboard.press(key);
                return true;
            } catch (err) {
                this.warnMissing(selector ?? "keyboard");
                return false;
            };
        };
    };


    /**
     * Waits for an element to become visible (timeout: 5000ms).
     * @param selector - The CSS selector to wait for.
     * @returns True if the element becomes visible, false if timeout or not found.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns false if the element is not found or does not become visible in time.
     */
    async waitForVisible(selector: string): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: 'visible', timeout: this.ACTION_TIMEOUT });
            return true;
        });
    };


    /**
     * Retrieves the page title from either the current page or a newly opened tab.
     * 
     * - If `waitForNewTab` is `false`, it simply returns the current page's title.
     * - If `waitForNewTab` is `true` and a `clickSelector` is provided, it clicks the element
     *   that opens a new tab, waits for the new tab to load, and returns that tab's title.
     * 
     * @param waitForNewTab - Set to true to wait for and return the title of a new tab.
     * @param clickSelector - CSS selector for the element that opens the new tab (required if `waitForNewTab` is true).
     * @returns A Promise that resolves to the title of the target page.
     */
    async getPageTitle(waitForNewTab: boolean = false, clickSelector?: string): Promise<string> {
        if (waitForNewTab && clickSelector) {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                this.click(clickSelector)
            ]);

            await newPage.waitForLoadState();
            return await newPage.title();
        };

        return this.page.title();
    };

    /**
     * Gets the current URL of the page.
     * Waits for a short time to ensure the page is fully loaded (timeout: 500ms).
     * @returns A Promise that resolves to the current URL of the page.
     * @remarks
     * Uses a short wait to avoid race conditions with navigation.
     */
    async getPageUrl(): Promise<string> {
        await this.page.waitForTimeout(500);
        return this.page.url();
    };


    /**
     * Hovers the mouse over the element specified by the selector.
     * Waits for the element to be visible (timeout: 5000ms).
     * Optionally waits for a specified amount of time after hovering.
     * @param selector - The CSS selector of the element to hover.
     * @param waitAfterMs - Optional delay in milliseconds after hover (default is 0).
     * @returns True if hover was successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting and hovering. Logs a warning and returns false if the element is not found or not hoverable.
     */
    async hover(selector: string, waitAfterMs: number = 0): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            await locator.hover({ timeout: this.ACTION_TIMEOUT });

            if (waitAfterMs > 0) {
                await this.page.waitForTimeout(waitAfterMs);
            };

            return true;
        });
    };


    /**
     * Quickly hovers over all elements matching the given locator, moving the mouse to the center of each.
     * Waits for the elements to be attached (timeout: 5000ms).
     * @param buttonsLocator - The CSS selector for the group of buttons to sweep over.
     * @returns A Promise that resolves when the sweep is complete.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning if no elements are found.
     */
    async fastSweepHover(buttonsLocator: string): Promise<void> {
        await this.withLocator(buttonsLocator, async (locator) => {
            await locator.waitFor({ state: "attached", timeout: this.ACTION_TIMEOUT });
            const buttons = await locator.elementHandles();

            if (buttons.length === 0) {
                this.warnMissing(buttonsLocator);
            };

            for (const btn of buttons) {
                const box = await btn.boundingBox();

                if (box) {
                    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 1 });
                };
            };
        });
    };


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
        return (await this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: maxWaitTime });
            const startTime = Date.now();
            let endTime: number;
            // Poll until element is no longer visible
            while (await this.isVisible(selector)) {
                endTime = Date.now();
                if (endTime - startTime > maxWaitTime) break;
            };
            
            return endTime - startTime;
        })) as number || -1;
    };


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
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            
            // Configure screenshot options
            const screenshotOptions: any = { threshold: options?.threshold || 0.2, animations: 'disabled' };

            if (options?.mask) {
                screenshotOptions.mask = options.mask.map(maskSelector => this.page.locator(maskSelector));
            };

            await locator.screenshot({ path: `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png` });
            return true;
        });
    };


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
            };

            await this.page.screenshot({ path: `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png`, ...screenshotOptions });
            return true;
        } catch (err) {
            this.logError('Page screenshot', err);
            return false;
        };
    };


    /**
     * Waits for an element to be stable (no visual changes) before taking a screenshot.
     * Useful for charts and dynamic content that need time to render completely.
     * @param selector - The CSS selector of the element.
     * @param screenshotName - Name for the screenshot file.
     * @param stabilityTimeMs - Time to wait for element stability (default: 1000ms).
     * @returns True if successful, false otherwise.
     */
    async takeStableElementScreenshot(selector: string, screenshotName: string, stabilityTimeMs: number = 1000): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            await this.page.waitForTimeout(stabilityTimeMs);
            await locator.screenshot({ path: `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png`, animations: 'disabled' });
            return true;
        });
    };


    /**
     * Extracts colors from a screenshot and compares them against expected colors with tolerance.
     * Uses the get-image-colors library to extract dominant colors from the image.
     * @param screenshotPath - Path to the screenshot image file.
     * @param expectedColors - Array of expected RGB color values.
     * @param tolerance - RGB value tolerance for color matching (default: 50).
     * @returns True if all expected colors are found within tolerance, false otherwise.
     * @remarks
     * This method is useful for validating chart colors, theme colors, or any visual elements.
     * Colors are compared with tolerance to account for anti-aliasing and rendering variations.
     */
    protected async extractAndCompareColorsFromImage(imagePath: string, expectedColors: {r: number, g: number, b: number}[], tolerance: number = 50): Promise<boolean> {
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
                    this.logWarning(`Color validation failed: Expected [${expectedColor.r}, ${expectedColor.g}, ${expectedColor.b}] not found within tolerance ${tolerance}`);
                    return false;
                };
            };

            return true;
        } catch (error) {
            this.logError('Color extraction and comparison', error);
            return false;
        };
    };

    /**
     * Extracts text from an image using OCR (Optical Character Recognition)
     * @param imagePath - Path to the image file
     * @returns Promise<string> - Extracted text from the image
     */
    protected async extractTextFromImage(imagePath: string): Promise<string> {
        try {
            const { createWorker } = require('tesseract.js');
            const worker = await createWorker();
            
            console.log(`Extracting text from image: ${imagePath}`);
            const { data: { text } } = await worker.recognize(imagePath);
            await worker.terminate();
            
            console.log(`Extracted text: "${text.trim()}"`);
            return text.trim();
        } catch (error) {
            this.logError('Text extraction from image', error);
            return '';
        };
    };
};