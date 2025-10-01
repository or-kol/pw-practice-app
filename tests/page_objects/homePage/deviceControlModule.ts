
import { BasePage } from "../basePage";
import { Page, expect } from "@playwright/test";
import { Logger } from "../utils/logger";

export class DeviceControlModule extends BasePage {
    constructor(page: Page) {
        super(page);
    };

    async buttonControllerSwitch(controllerName: string, switchDesiredStatus: "ON" | "OFF"): Promise<void> {
        const switchLocator = `ngx-status-card[ng-reflect-title='${controllerName}']`;
        const switchStatusLocator = `${switchLocator} div.status.paragraph-2`;

        const switchInitialStatus = await this.getText(switchStatusLocator);

        if (switchInitialStatus != switchDesiredStatus) {
            await this.click(switchLocator);
        };

        const switchCurrentstatus = await this.getText(switchStatusLocator);
        expect(switchCurrentstatus).toBe(switchDesiredStatus);
    };

    async tempAndHumiditySwitch(switchName: "Temperature" | "Humidity"): Promise<void> {
        if (switchName == "Humidity"){
            await this.click(`li.tab >> text=${switchName}`);
        };

        const switchLoctor = `[tabtitle='${switchName}'] ngx-temperature-dragger circle`;
        const valueLoctor = `[tabtitle='${switchName}'] ngx-temperature-dragger`;

        await this.attributes.setAttributeVal(switchLoctor, "cx", "232.63");
        await this.attributes.setAttributeVal(switchLoctor, "cy", "232.63");
        await this.click(switchLoctor);
        const ActualVal = await this.getText(valueLoctor);
        expect(ActualVal.includes("30") || ActualVal.includes("100")).toBeTruthy();
    };

    async tempAndHumiditySwitch2(switchName: "Temperature" | "Humidity", offsetX: number, offsetY: number, expectedTemp: string): Promise<void> {
        if (switchName == "Humidity"){
            await this.click(`li.tab >> text=${switchName}`);
        };

        const switchLoctor = `[tabtitle='${switchName}'] ngx-temperature-dragger`;

        await this.attributes.scrollIntoView(switchLoctor);
        await this.mouseInteraction.moveMouseInBoxedElement(switchLoctor, offsetX, offsetY, true);
        const ActualVal = await this.getText(switchLoctor);
        expect(ActualVal.includes(expectedTemp)).toBeTruthy();
    };


    async acStatesSwitch(desiredState: string): Promise<void>  {
        let stateButtonLoctor: string;

        switch (desiredState){
            case "cool":
                stateButtonLoctor = "[tabtitle='Temperature'] .nb-snowy-circled";
                break;
            case "warm":
                stateButtonLoctor = "[tabtitle='Temperature'] .nb-sunny-circled";
                break;
            case "heat":
                stateButtonLoctor = "[tabtitle='Temperature'] .nb-flame-circled";
                break;
            case "fan":
                stateButtonLoctor = "[tabtitle='Temperature'] .nb-loop-circled";
                break;
            default:
                Logger.logError("acStatesSwitch", "State button was not found");
                throw new Error("State button was not found");
        };

        await this.click(stateButtonLoctor);
        const currentState = await this.attributes.getAttribute("[ng-reflect-name='temperature-mode']", "ng-reflect-model");
        expect(currentState).toContain(desiredState);
    };


    async tempSwitchOnOffButton(desiredState: string): Promise<void> {
        const tempSwitchLoctor = "[tabtitle='Temperature'] ngx-temperature-dragger button";
        let classAttr = await this.attributes.getAttribute(tempSwitchLoctor, "class");
        const isOnInitailly = /\bon\b/.test(classAttr ?? "");

        if (isOnInitailly && desiredState === "off" || !(isOnInitailly) && desiredState === "on"){
            await this.click(tempSwitchLoctor);
        };
        
        classAttr = await this.attributes.getAttribute(tempSwitchLoctor, "class");
        const isOnFinally = /\bon\b/.test(classAttr ?? "");

        if (desiredState === "on") {
            expect(isOnFinally).toBe(true);
        } else {
            expect(isOnFinally).toBe(false);
        }
    };
};