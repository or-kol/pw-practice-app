import { expect, Page } from "@playwright/test";
import { TEST_TIMEOUTS, LocatorHelper } from "../utils";
import { AttributesMixin, MouseAndKeyboardMixin, VisualTestingMixin, NavigationMixin } from "../utils/mixins";

export class BasePage {
    
    readonly page: Page;
    // Add common constants
    protected readonly HALF_SEC = 500;
    private readonly ACTION_TIMEOUT = TEST_TIMEOUTS.ACTION;
    
    // Public mixins - direct access for page objects
    public readonly attributes: AttributesMixin;
    public readonly mouseAndKeyboardInteraction: MouseAndKeyboardMixin;
    public readonly visualTesting: VisualTestingMixin;
    public readonly navigation: NavigationMixin;

    constructor(page: Page) {
        this.page = page;
        this.attributes = new AttributesMixin(page);
        this.mouseAndKeyboardInteraction = new MouseAndKeyboardMixin(page);
        this.visualTesting = new VisualTestingMixin(page);
        this.navigation = new NavigationMixin(page);
    }


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
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
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
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            await locator.fill('', { timeout: this.ACTION_TIMEOUT });
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
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
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
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
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
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
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
        return (await LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: this.ACTION_TIMEOUT });
            const tagName = await locator.evaluate(element => element.tagName.toLowerCase());

            if (["input", "textarea", "select"].includes(tagName)) {
                return await locator.inputValue();
            } else {
                try {
                    return (await locator.innerText())?.trim() ?? "";
                } catch {
                    return (await locator.textContent())?.trim() ?? "";
                };
            };
        })) as string;
    };

    /**
     * Waits for an element to become visible (timeout: 5000ms).
     * @param selector - The CSS selector to wait for.
     * @returns True if the element becomes visible, false if timeout or not found.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns false if the element is not found or does not become visible in time.
     */
    async waitForVisible(selector: string): Promise<boolean> {
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: 'visible', timeout: this.ACTION_TIMEOUT });
            return true;
        });
    };

    /**
     * Generic table data reader that can work with any table structure
     * @param rowSelector - CSS selector for table rows
     * @param columnMapping - Object mapping field names to column indices
     * @param skipColumns - Optional array of column indices to skip (e.g., actions column)
     * @returns Array of objects with the mapped data
     */
    protected async readTableData<T>(
        rowSelector: string, 
        columnMapping: { [K in keyof T]: number },
        skipColumns: number[] = [0] // Skip actions column by default
        ): Promise<T[]> {
        return await LocatorHelper.withLocator(this.page, rowSelector, async (rows) => {
            const rowLocators = await rows.all();
            
            return await Promise.all(rowLocators.map(async (row) => {
                const cells = row.locator('td');
                const getText = async (idx: number) => (await cells.nth(idx).textContent())?.trim() ?? '';
                
                const result = {} as T;
                for (const [field, index] of Object.entries(columnMapping)) {
                    if (!skipColumns.includes(index as number)) {
                        (result as any)[field] = await getText(index as number);
                    };
                };
                
                return result;
            }));
        }) || [];
    };

    async handleDialog(options: {
        action: 'accept' | 'dismiss',
        expectType?: 'alert' | 'beforeunload' | 'confirm' | 'prompt',
        messageMatch?: RegExp,
        promptText?: string
    }): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            if (options.expectType) {
                expect(dialog.type()).toBe(options.expectType);
            }
            if (options.messageMatch) {
                expect(dialog.message()).toMatch(options.messageMatch);
            }
            if (options.action === 'accept') {
                await dialog.accept(options.promptText);
            } else {
                await dialog.dismiss();
            }
        });
    };

};