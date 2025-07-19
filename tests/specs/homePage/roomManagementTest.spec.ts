import {test, expect} from "../../base/baseTest"
import roomData from "../../data/roomManagement.json"


test.describe('Room selection test suite', () => {
    Object.entries(roomData).forEach(([room, id]) => {
        test(`Select ${room} test`, async ({ baseTest }) => {
            const result = await baseTest.roomManagementModule.selectRoomManagement(id);
            expect(result).toBeTruthy();
        });
    });
});


