import { Page, expect } from "@playwright/test";
import { SmartTableUtils } from "./smartTableUtils";

export class SmartTablePage extends SmartTableUtils {

    constructor(page: Page){
        super(page);
    }

    async goToSmartTablePage(): Promise<void> {
        await this.click(`a[title="Tables & Data"]`);
        await this.click(`a:has-text("Smart Table")`, 500);
    };
    

    async filterTableData(placeholder: string, value: string, behavior: string, expectEmpty: boolean): Promise<void> {
        const filterInputFieldSelector = `ngx-smart-table table thead input[placeholder="${placeholder}"]`;
        await this.fillInput({ selector: filterInputFieldSelector, value});
        await this.page.waitForTimeout(500);
        const data = await this.getAllDataFromTable();
        
        if (expectEmpty) {
            expect(data).toHaveLength(0);
            return;
        };

        this.validateFilterBehavior(data, placeholder, value, behavior);
    };
};