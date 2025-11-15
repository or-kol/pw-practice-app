import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export type RowData = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    age: string;
};

export class SmartTablePage extends BasePage {

    private readonly SMART_TABLE_CONFIG = {
        rowSelector: 'ngx-smart-table table tbody tr.ng2-smart-row',
        columnMapping: {
            id: 1,
            firstName: 2,
            lastName: 3,
            username: 4,
            email: 5,
            age: 6
        } as { [K in keyof RowData]: number },
        skipColumns: [0] // Skip actions column
    };

    constructor(page: Page){
        super(page);
    }

    async goToSmartTablePage(): Promise<void> {
        await this.click(`a[title="Tables & Data"]`);
        await this.click(`a:has-text("Smart Table")`, 500);
    };
    
    async filterTableData(placeholder: string, value: string, expectedData?: RowData, expectedRowCount?: number): Promise<void> {
        const filterInputFieldSelector = `ngx-smart-table table thead input[placeholder="${placeholder}"]`;
        await this.fillInput({ selector: filterInputFieldSelector, value });
        await this.page.waitForTimeout(500);
        const data = await this.readTableData(this.SMART_TABLE_CONFIG.rowSelector, this.SMART_TABLE_CONFIG.columnMapping);
        
        if (expectedData) {
            expect(data).toEqual([expectedData]);
        };
        
        if (expectedRowCount !== undefined) {
            expect(data).toHaveLength(expectedRowCount);
        };
    };
    

    
};