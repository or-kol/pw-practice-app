import { test } from "../../page_objects/utils/browserSetup"
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const roomData = require(`${TEST_PATHS.TEST_DATA}/homePage/roomManagement.json`) as any;
const playlistData = require(`${TEST_PATHS.TEST_DATA}/homePage/playlistData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe('Room selection test suite', () => {
    roomData.rooms.forEach(({ name, id, xfail }) => {
        test(`Select ${name} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for room selection: ${name}`);
            }
            await pageManager.roomManagementModule.selectRoomManagement(id);
        });
    });
});


test.describe(`Playlist - song progress bar test suite`, () => {
    const progressBarData = playlistData.progressBar;
    progressBarData.forEach(({ x, y, expectedPossition, xfail }, index: number) => {
        test(`Progress bar case #${index + 1}: offset(${x}, ${y}) expected ${expectedPossition}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure: Progress bar may not match expected possition: ${expectedPossition}`);
            }
            await pageManager.roomManagementModule.progressBarScrubbing(x, y, expectedPossition);
        });
    });
});


test.describe(`Playlist - select shufle/repeat list options test suite`, () => {
    const shuffleRepeatButtons = playlistData.shuffleRepeatButtons;
    shuffleRepeatButtons.forEach(({ index, label }) => {
        test(`Play ${label} with button index ${index}`, async () => {
            await pageManager.roomManagementModule.playlistshufleOrRepeat(index);
        });
    });
});


test.describe(`Playlist - next/previous song test suite`, () => {
    const prevNextButtons = playlistData.prevNextButtons;
    prevNextButtons.forEach(({ index, label }) => {
        test(`Go to ${label} song with button index ${index}`, async () => {
            await pageManager.roomManagementModule.playlistPrevOrNext(index);
        });
    });
});


test.describe(`Playlist - Play/pause song test suite`, ()=> {
    const playPauseStates = playlistData.playPauseStates;
    playPauseStates.forEach(({ index, state }) => {
        test(`Play/pause song with button index ${index} and expected state ${state}`, async () => {
            await pageManager.roomManagementModule.playlistPlayOrPause(index, state);
        });
    });
});


test.describe(`Playlist - volume control test suite`, () => {
    test(`Mute button test`, async () => {
        await pageManager.roomManagementModule.muteVolume();
    });
});
