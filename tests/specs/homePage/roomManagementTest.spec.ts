import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../page_objects/pageManager";
import path from "path";

const roomData = require(`${TEST_PATHS.TEST_DATA}/homePage/roomManagement.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test.describe('Room selection test suite', () => {
    const rooms = roomData.rooms;
    rooms.forEach(({ name, id }) => {
        test(`Select ${name} test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.roomManagementModule.selectRoomManagement(id);
        });
    });
});

test.describe(`Playlist - song progress bar test suite`, () => {
    const progressBarData = roomData.playlist.progressBar;
    progressBarData.forEach(({ x, y, expectedPossition }, index: number) => {
        test(`Progress bar case #${index + 1}: offset(${x}, ${y}) expected ${expectedPossition}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.roomManagementModule.progressBarScrubbing(x, y, expectedPossition);
        });
    });
});

test.describe(`Playlist - select shufle/repeat list options test suite`, () => {
    const shuffleRepeatButtons = roomData.playlist.shuffleRepeatButtons;
    shuffleRepeatButtons.forEach(({ index, label }) => {
        test(`Play ${label} with button index ${index}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.roomManagementModule.playlistshufleOrRepeat(index);
        });
    });
});

test.describe(`Playlist - next/previous song test suite`, () => {
    const prevNextButtons = roomData.playlist.prevNextButtons;
    prevNextButtons.forEach(({ index, label }) => {
        test(`Go to ${label} song with button index ${index}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.roomManagementModule.playlistPrevOrNext(index);
        });
    });
});

test.describe(`Playlist - Play/pause song test suite`, ()=> {
    const playPauseStates = roomData.playlist.playPauseStates;
    playPauseStates.forEach(({ index, state }) => {
        test(`Play/pause song with button index ${index} and expected state ${state}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.roomManagementModule.playlistPlayOrPause(index, state);
        });
    });
});

test(`Mute button test`, async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.roomManagementModule.muteVolume();
});

