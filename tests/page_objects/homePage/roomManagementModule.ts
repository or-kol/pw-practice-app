import { Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class RoomManagementModule extends BasePage{
    constructor(page: Page){
        super(page);
    }


    async selectRoomManagement(roomId: string){
        const roomLocator = `g[id="${roomId}"]`;
        await this.click(roomLocator);

        const selectedClass = await this.getAttribute(roomLocator, "class");
        return selectedClass.includes("selected-room")
    }
}