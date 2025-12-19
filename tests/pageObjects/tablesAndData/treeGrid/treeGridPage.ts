import { Page, expect } from "@playwright/test";
import { TreeGridRowData, TreeGridUtils } from "./treeGridUtils";

export class TreeGridPage extends TreeGridUtils {

    constructor(page: Page){
        super(page);
    }

    async goToTreeGridPage(): Promise<void> {
        await this.click(`a[title="Tables & Data"]`);
        await this.click(`a:has-text("Tree Grid")`, this.HALF_SEC);
    };

    async SearchTreeGridData(value: string, expectedRowCount: number): Promise<void> {
        const filterInputFieldSelector = `ngx-tree-grid nb-card-body #search`;
        await this.fillInput(filterInputFieldSelector, value);
        const data = await this.getAllTreeGridRows();
        expect(data.length).toBe(expectedRowCount);
    };

    async sortingTreeGrid(columnKey: keyof TreeGridRowData, order: "ascending" | "descending"): Promise<void> {
        const columnSortSelector = `ngx-tree-grid thead th[role="columnheader"] button:has-text("${columnKey.toLowerCase()}")`;
        await this.click(columnSortSelector, this.HALF_SEC);

        if (order === "descending") {
            await this.click(columnSortSelector, this.HALF_SEC);
        };

        const data = await this.getAllTreeGridRows();
        const isSorted = this.validateSort(data, columnKey, order);
        expect(isSorted).toBe(true);
    };
};