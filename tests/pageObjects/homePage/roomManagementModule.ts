import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class RoomManagementModule extends BasePage{

    private readonly PLAYLIST_CONTROL_BUTTONS_SELECTOR = (buttonPlace: number) => `ngx-player nb-card-body .controls button:nth-of-type(${buttonPlace})`;

    constructor(page: Page){
        super(page);
    };

    async loadHomePage(): Promise<void> {
        await this.waitForLoadState('load')
    };
    
    async selectRoomManagement(roomId: string): Promise<void> {
        const roomSelector = `g[id="${roomId}"]`;
        
        await this.click(roomSelector);
        const selectedClass = await this.attributes.getAttribute(roomSelector, "class");
        expect(selectedClass).toContain("selected-room");
    };

    async progressBarScrubbing(xAxis: number, yAxis: number, expectedPossition: string): Promise<void> {
        const progressBarSelector = `ngx-player nb-card-body .progress-wrap`;
        
        await this.attributes.scrollIntoView(progressBarSelector);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(progressBarSelector, xAxis, yAxis, true);
        const barPercentage = await this.attributes.getAttribute(`${progressBarSelector} div`, "style");
        expect(barPercentage).toContain(expectedPossition);
    };

    async playlistshufleOrRepeat(buttonPlace: number): Promise<void>{
        await this.click(this.PLAYLIST_CONTROL_BUTTONS_SELECTOR(buttonPlace));
        const buttonClass = await this.attributes.getAttribute(this.PLAYLIST_CONTROL_BUTTONS_SELECTOR(buttonPlace), "class");
        expect(/\bon\b/.test(buttonClass)).toBe(true);
    };

    async playlistPrevOrNext(buttonPlace: number): Promise<void>{
        const songDataSelector = `ngx-player .details`;
        const initialSongData = await this.getText(songDataSelector);
        await this.click(this.PLAYLIST_CONTROL_BUTTONS_SELECTOR(buttonPlace));
        const postClickSongData = await this.getText(songDataSelector);
        expect(initialSongData).not.toBe(postClickSongData);
    };

    async playlistPlayOrPause(buttonPlace: number, expectedState: string): Promise<void>{
        await this.click(this.PLAYLIST_CONTROL_BUTTONS_SELECTOR(buttonPlace));

        if (expectedState === `pause`) {
            await this.click(this.PLAYLIST_CONTROL_BUTTONS_SELECTOR(buttonPlace));
        };

        const buttonIcon = await this.attributes.getAttribute(this.PLAYLIST_CONTROL_BUTTONS_SELECTOR(buttonPlace), `ng-reflect-icon`);
        expect(buttonIcon).not.toContain(expectedState);
    };

    async muteVolume(): Promise<void> {
        const muteButtonSelector = `ngx-player nb-card-footer [icon="volume-down-outline"]`;
        const volumeStatusSelector = `ngx-player nb-card-footer .progress-wrap div`;

        await this.click(muteButtonSelector);
        const volumeStatus = await this.attributes.getAttribute(volumeStatusSelector, `style`);
        expect(volumeStatus).toContain(`width: 0%`);
    };
};