import { test } from "../../base/browserSetup"
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const roomData = require(`${TEST_PATHS.TEST_DATA}/homePage/roomManagement.json`) as any;
const playlistData = require(`${TEST_PATHS.TEST_DATA}/homePage/playlistData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe('Room selection test suite', () => {
    for (const [roomName, roomObj] of Object.entries(roomData.roomID[0]) as any[]) {
        test(`Select ${roomName} test`, async () => {
            if (roomObj.xfail) {
                test.fail(true, `Expected failure for room selection: ${roomName}`);
            };
            await pageManager.roomManagementModule.selectRoomManagement(roomObj.id);
        });
    };
});


test.describe(`Playlist - song progress bar test suite`, () => {
    for (const [index, progressConfig] of Object.entries(playlistData.progressBar) as any[]){
        const xfail = playlistData.songData[0].xfail;
        test(`Progress bar case #${Number(index) + 1}: offset(${progressConfig.x}, ${progressConfig.y})  expected ${progressConfig.expectedPossition}`, async() => {
            if (xfail) {
                test.fail(true, `Expected failure: Progress bar may not match expected possition: ${progressConfig.expectedPossition}`);
            };
            await pageManager.roomManagementModule.progressBarScrubbing(progressConfig.x, progressConfig.y, progressConfig.expectedPossition);
        });
    };
});


test.describe(`Playlist - select shufle/repeat list options test suite`, () => {
    const buttons = [{ index: 1, label: "shuffle" }, { index: 5, label: "repeat" }];

    buttons.forEach(({ index, label }) => {
        test(`Play ${label} with button index ${index}`, async () => {
            await pageManager.roomManagementModule.playlistshufleOrRepeat(index);
        });
    });
});


test.describe(`Playlist - next/previous song test suite`, () => {
    const buttons = [{ index: 2, label: "previous" }, { index: 4, label: "next" }];

    buttons.forEach(({ index, label }) => {
        test(`Go to ${label} song with button index ${index}`, async () => {
            await pageManager.roomManagementModule.playlistPrevOrNext(index);
        });
    });
});


test.describe(`Playlist - Play/pause song test suite`, ()=> {
    ["play", "pause"].forEach((state) => {
        test(`Play/pause song with button index 3 and expected state ${state}`, async () => {
            await pageManager.roomManagementModule.playlistPlayOrPause(3, state);
        });
    });
});


test.describe(`Playlist - volume control test suite`, () => {
    test(`Mute button test`, async () => {
        await pageManager.roomManagementModule.muteVolume();
    });
});
