export default class RoomSplitterCalculator {

    calculateTotalRoomsArea(rooms) {
        return this.sumValueOfRoomData(rooms, 'area');
    }

    calculateTotalOccupants(rooms) {
        return this.sumValueOfRoomData(rooms, 'occupants');
    }

    calculateCommonSpace(rooms, area) {
        const totalRoomsArea = this.calculateTotalRoomsArea(rooms);
        const totalArea = area;
        return totalArea - totalRoomsArea;
    }

    calculateBasePayment(rooms, commonSpaceValue) {
        const numberOccupants = this.sumValueOfRoomData(rooms, 'occupants');
        return commonSpaceValue / numberOccupants;
    }

    sumValueOfRoomData(rooms, valueToSum) {
        let valuesToSum = rooms.map(function (room) {
            return parseFloat(room[valueToSum]) || 0;
        });
        return valuesToSum.reduce((total, currentValue) => total + currentValue);
    }
}
