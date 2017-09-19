export default class RoomSplitterCalculator {

    calculateARoomsPercentOfTotalSpace(room, totalSpace) {
        return room.area / totalSpace || 0;
    }

    calculateARoomsPercentOfPrivateSpace(room, privateSpace) {
        return room.area / privateSpace || 0;
    }

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

    calculateValueCommonSpace(rent, commonSpacePercentage) {
        return rent * commonSpacePercentage;
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
