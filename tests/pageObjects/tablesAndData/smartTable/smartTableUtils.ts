import { Page, expect } from "@playwright/test";
import { RowData, TablesAndDataUtils } from "../TablesAndDataUtils";

export { RowData };

export class SmartTableUtils extends TablesAndDataUtils {

    private readonly FIRST_PAGE_BUTTON_SELECTOR = 'ng2-smart-table-pager .ng2-smart-pagination li:has([aria-label="First"])';
    private readonly PREV_PAGE_BUTTON_SELECTOR = 'ng2-smart-table-pager .ng2-smart-pagination li:has([aria-label="Prev"])';
    private readonly NEXT_PAGE_BUTTON_SELECTOR = 'ng2-smart-table-pager .ng2-smart-pagination li:has([aria-label="Next"])';
    private readonly LAST_PAGE_BUTTON_SELECTOR = 'ng2-smart-table-pager .ng2-smart-pagination li:has([aria-label="Last"])';
    
    private readonly SMART_TABLE_CONFIG = {
        rowSelector: 'ngx-smart-table table tbody tr.ng2-smart-row',
        columnMapping: {
            "ID": 1,
            "First Name": 2,
            "Last Name": 3,
            "Username": 4,
            "E-mail": 5,
            "Age": 6
        } as { [K in keyof RowData]: number },
        skipColumns: [0]
    };

    constructor(page: Page) {
        super(page);
    };

    
    async getDataFromTable(maxPages?: number): Promise<RowData[]> {
        let currentPage = 1;
        let data = await this.readTableData(this.SMART_TABLE_CONFIG.rowSelector, this.SMART_TABLE_CONFIG.columnMapping) as RowData[];

        while (await this.isVisible(this.NEXT_PAGE_BUTTON_SELECTOR) && 
        await this.hasNextPage() &&
        (!maxPages || currentPage < maxPages)) {
            await this.goToNextPage();
            const newData = await this.readTableData(this.SMART_TABLE_CONFIG.rowSelector, this.SMART_TABLE_CONFIG.columnMapping) as RowData[];
            data = data.concat(newData);
            currentPage++;
        };

        return data;
    };

    validateFilterBehavior(data: RowData[], placeholder: string, value: string, behavior: string): void {
        switch (behavior) {
            case "startsWith":
                data.forEach(row => {
                    expect(row[placeholder].toLowerCase().startsWith(value.toLowerCase())).toBe(true);
                });
                break;
            case "contains":
                data.forEach(row => {
                    expect(row[placeholder].toLowerCase()).toContain(value.toLowerCase());
                });
                break;
            case "exact":
                data.forEach(row => {
                    expect(row[placeholder].toLowerCase()).toBe(value.toLowerCase());
                });
                break;
            default:
                throw new Error(`Unknown behavior: ${behavior}. Supported: startsWith, contains, exact`);
        };
    };

    protected async hasNextPage(): Promise<boolean> {
        const classAttribute = await this.attributes.getAttribute(this.NEXT_PAGE_BUTTON_SELECTOR, 'class');
        return !(classAttribute?.includes('disabled'));
    };

    protected async hasPrevPage(): Promise<boolean> {
        const classAttribute = await this.attributes.getAttribute(this.PREV_PAGE_BUTTON_SELECTOR, 'class');
        return !(classAttribute?.includes('disabled'));
    };

    async goToPrevPage(): Promise<void> {
        await this.click(this.PREV_PAGE_BUTTON_SELECTOR, this.HALF_SEC);
    };

    async goToNextPage(): Promise<void> {
        await this.click(this.NEXT_PAGE_BUTTON_SELECTOR, this.HALF_SEC);
    };

    async goToFirstPage(): Promise<void> {
        await this.click(this.FIRST_PAGE_BUTTON_SELECTOR, this.HALF_SEC);
    };

    async goToLastPage(): Promise<void> {
        await this.click(this.LAST_PAGE_BUTTON_SELECTOR, this.HALF_SEC);
    };

    async insertRowCellsData(content: Partial<RowData>, rowLocator?: string): Promise<void> {
        for (const [field, value] of Object.entries(content) as [keyof RowData, string | number][]) {
            if (value === undefined || value === null) continue; // skip unspecified fields
            const dataFieldSelector = `ng2-smart-table .ng-star-inserted input-editor input[placeholder="${field}"]`;
            await this.fillInput(dataFieldSelector, String(value));
    };
}
};


