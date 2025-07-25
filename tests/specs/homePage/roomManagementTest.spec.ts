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
        })
    }
})


test(`Go to next song test`, async ({baseTest}) => {
    const result = await baseTest.roomManagementModule.getSongName();

    if (playlistData.songData[0].xfail) {
        test.fail(true, `Expected failure: Song name may not match ${playlistData.songData[0].name}`);
    }

    expect(result).toBeTruthy();
});
