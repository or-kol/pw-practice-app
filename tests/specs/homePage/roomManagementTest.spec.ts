import {test, expect} from "../../base/baseTest"
import roomData from "../../data/roomManagement.json"


test.describe('Room selection test suite', () => {
    for (const [roomName, roomID] of Object.entries(roomData.roomID[0])) {
        test(`Select ${roomName} test`, async ({ baseTest }) => {
            const result = await baseTest.roomManagementModule.selectRoomManagement(roomID);
            expect(result).toBeTruthy();
        });
    }
});


