import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";


export class RoomManagementModule extends BasePage{

    constructor(page: Page){
        super(page);
    };


    async selectRoomManagement(roomId: string): Promise<void> {
        const roomLocator = `g[id="${roomId}"]`;
        
        await this.click(roomLocator);
        const selectedClass = await this.attributes.getAttribute(roomLocator, "class");
        expect(selectedClass).toContain("selected-room");
    };


    async progressBarScrubbing(xAxis: number, yAxis: number, expectedPossition: string): Promise<void> {
        const progressBarLocator = `ngx-player nb-card-body .progress-wrap`;
        
        await this.attributes.scrollIntoView(progressBarLocator);
        await this.mouseInteraction.moveMouseInBoxedElement(progressBarLocator, xAxis, yAxis, true);
        const barPercentage = await this.attributes.getAttribute(`${progressBarLocator} div`, "style");
        expect(barPercentage).toContain(expectedPossition);
    };

    
    async playlistshufleOrRepeat(buttonPlace: number): Promise<void>{
        const playlistControlButtonsLocator = `ngx-player nb-card-body .controls button:nth-of-type(${buttonPlace})`;
        
        await this.click(playlistControlButtonsLocator);
        const buttonClass = await this.attributes.getAttribute(playlistControlButtonsLocator, "class");
        expect(/\bon\b/.test(buttonClass)).toBe(true);
    };

    
    async playlistPrevOrNext(buttonPlace: number): Promise<void>{
        const playlistControlButtonsLocator = `ngx-player nb-card-body .controls button:nth-of-type(${buttonPlace})`;
        const songDataLocator = `ngx-player .details`;

        const initialSongData = await this.getText(songDataLocator);
        await this.click(playlistControlButtonsLocator);
        const postClickSongData = await this.getText(songDataLocator);
        expect(initialSongData).not.toBe(postClickSongData);
    };


    async playlistPlayOrPause(buttonPlace: number, expectedState: string): Promise<void>{
        const playlistControlButtonsLocator = `ngx-player nb-card-body .controls button:nth-of-type(${buttonPlace})`;
        
        await this.click(playlistControlButtonsLocator);

        if (expectedState === `pause`) {
            await this.click(playlistControlButtonsLocator);
        };

        const buttonIcon = await this.attributes.getAttribute(playlistControlButtonsLocator, `ng-reflect-icon`);
        expect(buttonIcon).not.toContain(expectedState);
    };


    async muteVolume(): Promise<void> {
        const muteButtonLocator = `ngx-player nb-card-footer [icon="volume-down-outline"]`;
        const volumeStatusLocator = `ngx-player nb-card-footer .progress-wrap div`;

        await this.click(muteButtonLocator);
        const volumeStatus = await this.attributes.getAttribute(volumeStatusLocator, `style`);
        expect(volumeStatus).toContain(`width: 0%`);
    };
};