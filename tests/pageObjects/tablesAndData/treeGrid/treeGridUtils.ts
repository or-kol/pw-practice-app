import { Page } from "@playwright/test";
import { TreeGridRowData, TablesAndDataUtils } from "../TablesAndDataUtils";

export { TreeGridRowData };

export class TreeGridUtils extends TablesAndDataUtils {
    
    private readonly TREE_GRID_TABLE_SELECTOR = 'ngx-tree-grid table';

    private readonly TREE_GRID_CONFIG = {
        rowSelector: `${this.TREE_GRID_TABLE_SELECTOR} tbody tr[nbtreegridrow]:has(td)`,
        columnMapping: {
            "Name": 0,
            "Size": 1,
            "Kind": 2,
            "Items": 3
        } as unknown as { [K in keyof TreeGridRowData]: number },
        skipColumns: []
    };

    constructor(page: Page) {
        super(page);
    };
    
    async getAllTreeGridRows(): Promise<TreeGridRowData[]> {
        await this.waitForTimeout(this.HALF_SEC);
        const data = await this.readTableData<TreeGridRowData>(
            this.TREE_GRID_CONFIG.rowSelector,
            this.TREE_GRID_CONFIG.columnMapping,
            this.TREE_GRID_CONFIG.skipColumns
        ) as TreeGridRowData[];
        return data;
    };

    

    /**
     * Expands only the next level currently available (one "wave").
     * It clicks only collapsed toggles (aria-label="expand") that are visible right now,
     * then stops (it will NOT keep expanding newly revealed deeper levels).
     * @returns number of expand clicks performed
     */
    async expandNextTreeGridLevel(maxClicks: number = 1000): Promise<number> {
        const expandBtn = 'ngx-tree-grid button[aria-label="expand"]';
        const clicked = await this.clickAll(expandBtn, maxClicks);
        if (clicked > 0) {
            await this.waitForTimeout(this.HALF_SEC);
        }
        return clicked;
    };

    private async expandAllTreeGridFolders(): Promise<void> {
        const expandBtn = 'ngx-tree-grid button[aria-label="expand"]';

        for (let pass = 0; pass < 10; pass++) {
            const clicked = await this.clickAll(expandBtn, 1000);
            if (clicked === 0) break;
            await this.waitForTimeout(this.HALF_SEC);
        };
    };

   
};


