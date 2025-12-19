import { Page, expect } from "@playwright/test";
import { SmartTableRowData, SmartTableUtils } from "./smartTableUtils";

export class SmartTablePage extends SmartTableUtils {

    private readonly TWO_PAGES = 2;
    private readonly EMPTY_DATA = 0;
    private readonly NUMBER_OF_ROWS_IN_PAGE = 10;
    private readonly ADD_NEW_ROW_SELECTOR = `ng2-smart-table tr[ng2-st-thead-filters-row] th[ng2-st-add-button]`;
    private readonly TABLE_ROW_SELECTOR = (rowIndex: number) => `ng2-smart-table tbody tr:nth-child(${rowIndex})`;
    private readonly EDIT_ROW_BUTTON_SELECTOR = (rowIndex: number) => `${this.TABLE_ROW_SELECTOR(rowIndex)} .nb-edit`;

    constructor(page: Page){
        super(page);
    }

    async goToSmartTablePage(): Promise<void> {
        await this.click(`a[title="Tables & Data"]`);
        await this.click(`a:has-text("Smart Table")`, this.HALF_SEC);
    };
    
    async filterTableData(placeholder: string, value: string, behavior: string, expectEmpty: boolean): Promise<void> {
        const filterInputFieldSelector = `ngx-smart-table table thead input[placeholder="${placeholder}"]`;
        await this.fillInput(filterInputFieldSelector, value);
        await this.page.waitForTimeout(this.HALF_SEC);
        const data = await this.getDataFromTable();
        
        if (expectEmpty) {
            expect(data).toHaveLength(this.EMPTY_DATA);
            return;
        };

        this.validateFilterBehavior(data, placeholder, value, behavior);
    };

    async sortTableByColumn(columnKey: keyof SmartTableRowData, sortOrder: 'ascending' | 'descending'): Promise<void> {
        const columnHeaderSortSelector = `ngx-smart-table table thead a:has-text("${columnKey}")`;
        await this.click(columnHeaderSortSelector);
        
        if (sortOrder === 'descending') {
            await this.click(columnHeaderSortSelector);
        };

        const data = await this.getDataFromTable(this.TWO_PAGES); // Limit to first 2 pages for performance
        const isSortedCorrectly = this.validateSort(data, columnKey, sortOrder);
        expect(isSortedCorrectly).toBeTruthy();
    };

    async goToLastPageButton(): Promise<void> {
        await this.goToLastPage();
        expect(await this.hasPrevPage()).toBeTruthy();
        expect(await this.hasNextPage()).toBeFalsy();
    };

    async goToFirstPageButton(): Promise<void> {
        await this.goToNextPage();
        expect(await this.hasPrevPage()).toBeTruthy();
        await this.goToFirstPage();
        expect(await this.hasPrevPage()).toBeFalsy(); 
    };

    async goToSpecificPage(pageNumber: number): Promise<void> {
        const pageNumberButtonSelector = `ng2-smart-table-pager .ng2-smart-pagination a:has-text("${pageNumber}")`;
        const pageValidationClassSelector = `ng2-smart-table-pager .ng2-smart-pagination .active span span`;
        
        if (await this.isVisible(pageNumberButtonSelector)) {
            await this.click(pageNumberButtonSelector);
        } else {
            throw new Error(
                `Page ${pageNumber} pagination link not visible. Selector: ${pageNumberButtonSelector}`
            );
        };

        const currentPageValidation = await this.getText(pageValidationClassSelector);
        expect(currentPageValidation).toBe("(current)");
    };

    async addRowToTable(content: SmartTableRowData, expectedToFail: boolean): Promise<void> {
        const approveInputButtonSelector = `ng2-smart-table .ng2-smart-actions ng2-st-actions .nb-checkmark`;
        await this.click(this.ADD_NEW_ROW_SELECTOR);
        await this.insertRowCellsData(content);
        await this.click(approveInputButtonSelector);
        const data = (await this.getDataFromTable(1))[0];
        
        if (expectedToFail) {
            throw new Error('Essential fields are missing in the added row data.'); // Product does not cover this case
        } else {
            expect(data).toEqual(content);
        };
    };

    async declineRowAddition(): Promise<void> {
        const declineInputButtonSelector = `ng2-smart-table .ng2-smart-actions ng2-st-actions .nb-close`;
        await this.click(this.ADD_NEW_ROW_SELECTOR);

        if (await this.isVisible(declineInputButtonSelector)) {
            await this.click(declineInputButtonSelector);
        }
        else {
            throw new Error('Decline input button not found; cannot decline row addition.');
        };

        const isNewRowAdditionVisible = await this.isVisible(declineInputButtonSelector);
        expect(isNewRowAdditionVisible).toBeFalsy();
    };

    async editRowInTable(rowIndex: number, updatedContent: Partial<SmartTableRowData>, expectedToFail: boolean): Promise<void> {
        const approveButtonSelector = `${this.TABLE_ROW_SELECTOR(rowIndex)} .nb-checkmark`;
        await this.click(this.EDIT_ROW_BUTTON_SELECTOR(rowIndex));
        await this.insertRowCellsData(updatedContent);
        await this.click(approveButtonSelector);
        const data = (await this.getDataFromTable(1))[rowIndex - 1];

        if (expectedToFail) {
            throw new Error('Essential fields are missing in the edited row data.'); // Product does not cover this case
        }
        else {
            for (const [field, value] of Object.entries(updatedContent) as [keyof SmartTableRowData, string | number][]) {
                expect(data[field]).toBe(value);
            };
        };
    };

    async declineRowEdit(rowIndex: number): Promise<void> {
        const declineEditButtonSelector = `${this.TABLE_ROW_SELECTOR(rowIndex)} .nb-close`;
        await this.click(this.EDIT_ROW_BUTTON_SELECTOR(rowIndex));

        if (await this.isVisible(declineEditButtonSelector)) {
            await this.click(declineEditButtonSelector);
        }
        else {
            throw new Error('Decline edit button not found; cannot decline row edit.');
        };

        const isNewRowAdditionVisible = await this.isVisible(declineEditButtonSelector);
        expect(isNewRowAdditionVisible).toBeFalsy();
    };

    deleteRowFromTable = async (rowIndex: number, confirm: boolean): Promise<void> => {
        const deleteRowButtonSelector = `${this.TABLE_ROW_SELECTOR(rowIndex)} .nb-trash`;
        const columnHeaderSortSelector = `ngx-smart-table table thead a:has-text("ID")`;
        await this.click(columnHeaderSortSelector); // Ensure consistent order before deletion

        await Promise.all([
            this.handleDialog({
                action: confirm ? 'accept' : 'dismiss',
                expectType: 'confirm',
                messageMatch: /Are you sure you want to delete?/
            }),
            this.click(deleteRowButtonSelector)
        ]);
        const data = await this.getDataFromTable(1);

        if (confirm) {
            expect(data[this.NUMBER_OF_ROWS_IN_PAGE - 1].ID).not.toBe(String(this.NUMBER_OF_ROWS_IN_PAGE));
        } else {
            expect(data).toHaveLength(this.NUMBER_OF_ROWS_IN_PAGE);
        };
    };
};