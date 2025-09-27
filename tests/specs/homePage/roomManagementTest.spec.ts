import {test, expect} from "../../base/baseTest"
import { TEST_PATHS } from "../../config/test-config";

const roomData = require(`${TEST_PATHS.TEST_DATA}/homePage/roomManagement.json`) as any;
const playlistData = require(`${TEST_PATHS.TEST_DATA}/homePage/playlistData.json`) as any;


test.describe('Room selection test suite', () => {
    for (const [roomName, roomObj] of Object.entries(roomData.roomID[0]) as any[]) {
        test(`Select ${roomName} test`, async ({ baseTest }) => {
            if (roomObj.xfail) {
                test.fail(true, `Expected failure for room selection: ${roomName}`);
            };
            const result = await baseTest.roomManagementModule.selectRoomManagement(roomObj.id);
            expect(result).toBeTruthy();
        });
    };
});


test.describe(`Playlist - song progress bar test suite`, () => {
    for (const [index, progressConfig] of Object.entries(playlistData.progressBar) as any[]){
        const xfail = playlistData.songData[0].xfail;
        test(`Progress bar case #${Number(index) + 1}: offset(${progressConfig.x}, ${progressConfig.y}) → expected ${progressConfig.expectedPossition}`, async({baseTest}) => {
            if (xfail) {
                test.fail(true, `Expected failure: Progress bar may not match expected possition: ${progressConfig.expectedPossition}`);
            };
            const result = await baseTest.roomManagementModule.progressBarScrubbing(progressConfig.x, progressConfig.y, progressConfig.expectedPossition);
            expect(result).toBeTruthy();
        });
    };
});


test.describe(`Playlist - select shufle/repeat list options test suite`, () => {
    const buttons = [{ index: 1, label: "shuffle" }, { index: 5, label: "repeat" }];

    buttons.forEach(({ index, label }) => {
        test(`Play ${label} with button index ${index}`, async ({ baseTest }) => {
            const result = await baseTest.roomManagementModule.playlistshufleOrRepeat(index);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Playlist - next/previous song test suite`, () => {
    const buttons = [{ index: 2, label: "previous" }, { index: 4, label: "next" }];

    buttons.forEach(({ index, label }) => {
        test(`Go to ${label} song with button index ${index}`, async ({ baseTest }) => {
            const result = await baseTest.roomManagementModule.playlistPrevOrNext(index);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Playlist - Play/pause song test suite`, ()=> {
    ["play", "pause"].forEach((state) => {
        test(`Play/pause song with button index 3 and expected state ${state}`, async ({ baseTest }) => {
            const result = await baseTest.roomManagementModule.playlistPlayOrPause(3, state);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Playlist - volume control test suite`, () => {
    test(`Mute button test`, async ({baseTest}) => {
        const result = await baseTest.roomManagementModule.muteVolume();
        expect(result).toBeTruthy();
    });
});
