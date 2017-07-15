import Room from './Room.js';

export default class Rooms {

    /**
     * Creates an instance of Rooms - which contains a collection of Room instances and helper methods to generate them.
     * @param {('new' | 'load')} creationMethod
     * @param {number} numberRooms
     * @param {number} savedRoomDataId
     * @memberof Rooms
     */
    constructor(roomConfiguration) {
        console.log('creating new rooms object');
        console.log(roomConfiguration);
        this.roomConfiguration = roomConfiguration;
        this.numberRooms = roomConfiguration.numRooms;
        this.area = roomConfiguration.area;
        this.rent = roomConfiguration.rent;
        this.rooms = this.createRoomObjects();
    }

    createRoomObjects() {
        let rooms = [];
        for (let i = 0; i < this.numberRooms; i++) {
            rooms.push(new Room(this.roomConfiguration.rooms[i]));
        }

        return rooms;
    }

    /**
     * Updates the number of rooms, and then generates that many new empty rooms.
\     * @param {number} newNumberRooms
     * @memberof Rooms
     */
    numberOfRoomsUpdated(newNumberRooms) {
        this.numberRooms = newNumberRooms;
        this.rooms = this.createEmptyRooms();
    }

    calculateTotalRoomsArea() {
        return this.sumValueOfRoomData(this.rooms, 'area');
    }

    calculateTotalOccupants() {
        return this.sumValueOfRoomData(this.rooms, 'occupants');
    }

    calculateCommonSpace() {
        const totalRoomsArea = this.calculateTotalRoomsArea();
        const totalArea = this.area;
        return totalArea - totalRoomsArea;
    }

    calculateCommonSpacePercentage() {
        const totalArea = this.area;
        const commonSpaceArea = this.calculateCommonSpace();
        return commonSpaceArea / totalArea;
    }

    calculateValueCommonSpace() {
        const commonSpacePercentage = this.calculateCommonSpacePercentage();
        const rent = this.rent;
        return rent * commonSpacePercentage;
    }

    calculateAreaRelatedValues() {
        this.commonSpace = this.calculateCommonSpace();
        this.privateSpace = this.area - this.calculateCommonSpace();

        this.commonSpacePercentage = this.calculateCommonSpacePercentage();
        this.privateSpacePercentage = 1 - this.commonSpacePercentage;

        this.commonSpaceValue = this.calculateValueCommonSpace();
        this.privateSpaceValue = this.rent - this.commonSpaceValue;

        console.log(this);
    }

    calculateBasePayment() {
        const numberOccupants = this.sumValueOfRoomData(this.rooms, 'occupants');
        return this.commonSpaceValue / numberOccupants;
    }

    calculatePaymentRelatedValues() {
        this.basePayment = this.calculateBasePayment();
        console.log(this.basePayment);
        this.rooms.forEach(room => {
            // If the room has occupants then we can calculate a payment for it.
            if (room.occupants > 0) {
                console.log('calculating payment for room ' + room.roomNumber);
                this.calculatePaymentForRoom(room);
            } else {
                room.privatePayment = 0;
                room.payment = 0;
                this.privateSpace -= room.area;
                this.commonSpace += room.area;
            }
        });
    }

    calculatePercentOfTotalSpace() {
        const totalArea = this.housingInformation.area;
        return this.area / totalArea;
    }

    updatePercentOfTotalSpace() {
        this.percentOfTotalSpace = this.calculatePercentOfTotalSpace();
    }

    calculatePaymentForRoom(room) {
        room.percentOfPrivateSpace = room.area / this.privateSpace;
        room.eachOccupantsPercentOfPrivateSpace = room.percentOfPrivateSpace / room.occupants;
        room.privatePayment = this.privateSpaceValue * room.eachOccupantsPercentOfPrivateSpace;
        let totalPayment = this.basePayment + room.privatePayment;
        room.payment = parseFloat(totalPayment).toFixed(2);
    }

    sumValueOfRoomData(rooms, valueToSum) {
        let valuesToSum = rooms.map(function (room) {
            return parseFloat(room[valueToSum]) || 0;
        });
        console.log(valuesToSum);
        return valuesToSum.reduce((total, currentValue) => total + currentValue);
    }

}
