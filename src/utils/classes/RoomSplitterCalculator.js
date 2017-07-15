export default class RoomSplitterCalculator {

    calculateARoomsPercentOfTotalSpace(room, totalSpace) {
        return room.area / totalSpace;
    }

    calculateARoomsPercentOfPrivateSpace(room, privateSpace) {
        return room.area / privateSpace;
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

    calculateCommonSpacePercentage(area, commonSpaceArea) {
        return commonSpaceArea / area;
    }

    calculateValueCommonSpace(rent, commonSpacePercentage) {
        return rent * commonSpacePercentage;
    }

    sumValueOfRoomData(rooms, valueToSum) {
        let valuesToSum = rooms.map(function (room) {
            return parseFloat(room[valueToSum]) || 0;
        });
        return valuesToSum.reduce((total, currentValue) => total + currentValue);
    }
}
