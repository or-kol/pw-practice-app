import { Page } from '@playwright/test';

// Import page classes
import { FormLayoutsPage } from './forms/formLayoutsPage';
import { DatepickerPage } from './forms/datepickerPage';
import { FeaturesMenuPage } from './homePage/featuresMenuNavigationArea';
import { TopBarPage } from './homePage/topBarArea';
import { DeviceControlModule } from './homePage/deviceControlModule';
import { ManagementConsoleModule } from './homePage/managementConsoleModule';
import { RoomManagementModule } from './homePage/roomManagementModule';
import { PhoneModule } from './homePage/phoneModule';
import { TrafficConsumption } from './homePage/trafficConsumptionModule';
import { SecurityCameras } from './homePage/securityCamerasModule';
import { HomePageFooter } from './homePage/homePageFooter';
import { DialogPage } from './modalAndOverlays/dialogPage';
import { WindowPage } from './modalAndOverlays/windowPage';
import { PopoverPage } from './modalAndOverlays/popoverPage';
import { ToastrPage } from './modalAndOverlays/toastrPage';
import { TooltipPage } from './modalAndOverlays/tooltipPage';
import { EchartsPage } from './charts/echartsPage';

/**
 * PageManager with lazy initialization
 * Only instantiates page objects when they're actually accessed
 */
export class PageManager {
    private page: Page;
    
    // Private properties to store instances (only created when needed)
    private _formLayoutsPage?: FormLayoutsPage;
    private _datepickerPage?: DatepickerPage;
    private _featuresMenuPage?: FeaturesMenuPage;
    private _topBarPage?: TopBarPage;
    private _deviceControlModule?: DeviceControlModule;
    private _managementConsoleModule?: ManagementConsoleModule;
    private _roomManagementModule?: RoomManagementModule;
    private _phoneModule?: PhoneModule;
    private _trafficConsumption?: TrafficConsumption;
    private _securityCameras?: SecurityCameras;
    private _homePageFooter?: HomePageFooter;
    private _dialogPage?: DialogPage;
    private _windowPage?: WindowPage;
    private _popoverPage?: PopoverPage;
    private _toastrPage?: ToastrPage;
    private _tooltipPage?: TooltipPage;
    private _echartsPage?: EchartsPage;

    constructor(page: Page) {
        this.page = page;
    }

    // Lazy getters - only create instances when accessed
    get formLayoutsPage(): FormLayoutsPage {
        if (!this._formLayoutsPage) {
            this._formLayoutsPage = new FormLayoutsPage(this.page);
        }
        return this._formLayoutsPage;
    }

    get datepickerPage(): DatepickerPage {
        if (!this._datepickerPage) {
            this._datepickerPage = new DatepickerPage(this.page);
        }
        return this._datepickerPage;
    }

    get featuresMenuPage(): FeaturesMenuPage {
        if (!this._featuresMenuPage) {
            this._featuresMenuPage = new FeaturesMenuPage(this.page);
        }
        return this._featuresMenuPage;
    }

    get topBarPage(): TopBarPage {
        if (!this._topBarPage) {
            this._topBarPage = new TopBarPage(this.page);
        }
        return this._topBarPage;
    }

    get deviceControlModule(): DeviceControlModule {
        if (!this._deviceControlModule) {
            this._deviceControlModule = new DeviceControlModule(this.page);
        }
        return this._deviceControlModule;
    }

    get managementConsoleModule(): ManagementConsoleModule {
        if (!this._managementConsoleModule) {
            this._managementConsoleModule = new ManagementConsoleModule(this.page);
        }
        return this._managementConsoleModule;
    }

    get roomManagementModule(): RoomManagementModule {
        if (!this._roomManagementModule) {
            this._roomManagementModule = new RoomManagementModule(this.page);
        }
        return this._roomManagementModule;
    }

    get phoneModule(): PhoneModule {
        if (!this._phoneModule) {
            this._phoneModule = new PhoneModule(this.page);
        }
        return this._phoneModule;
    }

    get trafficConsumption(): TrafficConsumption {
        if (!this._trafficConsumption) {
            this._trafficConsumption = new TrafficConsumption(this.page);
        }
        return this._trafficConsumption;
    }

    get securityCameras(): SecurityCameras {
        if (!this._securityCameras) {
            this._securityCameras = new SecurityCameras(this.page);
        }
        return this._securityCameras;
    }

    get homePageFooter(): HomePageFooter {
        if (!this._homePageFooter) {
            this._homePageFooter = new HomePageFooter(this.page);
        }
        return this._homePageFooter;
    }

    get dialogPage(): DialogPage {
        if (!this._dialogPage) {
            this._dialogPage = new DialogPage(this.page);
        }
        return this._dialogPage;
    }

    get windowPage(): WindowPage {
        if (!this._windowPage) {
            this._windowPage = new WindowPage(this.page);
        }
        return this._windowPage;
    }

    get popoverPage(): PopoverPage {
        if (!this._popoverPage) {
            this._popoverPage = new PopoverPage(this.page);
        }
        return this._popoverPage;
    }

    get toastrPage(): ToastrPage {
        if (!this._toastrPage) {
            this._toastrPage = new ToastrPage(this.page);
        }
        return this._toastrPage;
    }

    get tooltipPage(): TooltipPage {
        if (!this._tooltipPage) {
            this._tooltipPage = new TooltipPage(this.page);
        }
        return this._tooltipPage;
    }

    get echartsPage(): EchartsPage {
        if (!this._echartsPage) {
            this._echartsPage = new EchartsPage(this.page);
        }
        return this._echartsPage;
    }

    /**
     * Optional: Reset method to clear all instances
     * Useful for memory cleanup between tests if needed
     */
    reset(): void {
        this._formLayoutsPage = undefined;
        this._datepickerPage = undefined;
        this._featuresMenuPage = undefined;
        this._topBarPage = undefined;
        this._deviceControlModule = undefined;
        this._managementConsoleModule = undefined;
        this._roomManagementModule = undefined;
        this._phoneModule = undefined;
        this._trafficConsumption = undefined;
        this._securityCameras = undefined;
        this._homePageFooter = undefined;
        this._dialogPage = undefined;
        this._windowPage = undefined;
        this._popoverPage = undefined;
        this._toastrPage = undefined;
        this._tooltipPage = undefined;
        this._echartsPage = undefined;
    }
}