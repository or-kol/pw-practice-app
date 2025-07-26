import {test, expect} from "../../base/baseTest"
import roomData from "../../data/roomManagement.json"
import playlistData from "../../data/playlistData.json"


test.describe('Room selection test suite', () => {
    for (const [roomName, roomID] of Object.entries(roomData.roomID[0])) {
        test(`Select ${roomName} test`, async ({ baseTest }) => {
            const result = await baseTest.roomManagementModule.selectRoomManagement(roomID);
            expect(result).toBeTruthy();
        });
    }
});


test.describe(`Progress bar test suite`, () => {
    for (const [index, progressConfig] of Object.entries(playlistData.progressBar)){
        test(`Progress bar case #${index + 1}: offset(${progressConfig.x}, ${progressConfig.y}) → expected ${progressConfig.expectedPossition}`, async({baseTest}) => {
            const result = await baseTest.roomManagementModule.progressBarScrubbing(progressConfig.x, progressConfig.y, progressConfig.expectedPossition);

            if (playlistData.songData[0].xfail) {
                test.fail(true, `Expected failure: Progress bar may not match expected possition: ${progressConfig.expectedPossition}`);
            }

            expect(result).toBeTruthy();
        });
    };
});


test.describe(`Select shufle/repeat play list options`, () => {
    const buttons = [{ index: 1, label: "shuffle" }, { index: 5, label: "repeat" }];

    buttons.forEach(({ index, label }) => {
        test(`Play ${label} with button index ${index}`, async ({ baseTest }) => {
            const result = await baseTest.roomManagementModule.playlistshufleOrRepeat(index);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Go to next/previous song test`, () => {
    const buttons = [{ index: 2, label: "previous" }, { index: 4, label: "next" }];

    buttons.forEach(({ index, label }) => {
        test(`Go to ${label} song with button index ${index}`, async ({ baseTest }) => {
            const result = await baseTest.roomManagementModule.playlistPrevOrNext(index);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Play/pause song test suite`, ()=> {
    ["play", "pause"].forEach((state) => {
        test(`Play/pause song with button index 3 and expected state ${state}`, async ({ baseTest }) => {
            const result = await baseTest.roomManagementModule.playlistPlayOrPause(3, state);
            expect(result).toBeTruthy();
        });
    });
});
