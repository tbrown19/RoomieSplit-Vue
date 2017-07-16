import Room from './Room.js';
import Calculator from './RoomSplitterCalculator.js';
export default class RoomSplitter {

    /**
     * Creates an instance of Rooms - which contains a collection of Room instances and helper methods to generate them.
     * @param {('new' | 'load')} creationMethod
     * @param {number} numberRooms
     * @param {number} savedRoomDataId
     * @memberof Rooms
     */
    constructor(roomConfiguration) {
        this.Calculator = new Calculator();
        this.roomConfiguration = roomConfiguration;
        this.numberRooms = roomConfiguration.numRooms;
        this.area = roomConfiguration.area;
        this.rent = roomConfiguration.rent;
        this.rooms = this.createRoomObjects();
        this.updateInitalValues();
    }

    createRoomObjects() {
        let rooms = [];
        for (let i = 0; i < this.numberRooms; i++) {
            rooms.push(new Room(this.roomConfiguration.rooms[i]));
        }
        return rooms;
    }

    clearRoomObjects() {
        this.rooms.forEach(room => {
            room.clear();
        });
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

    updateInitalValues() {
        this.updateAreaRelatedValues();
        this.updatePaymentRelatedValues();
        this.updateEachRoomsValues();
    }

    updateEachRoomsValues() {
        for (let i = 0; i < this.numberRooms; i++) {
            this.updateARoomsValues(this.rooms[i]);
        }
    }

    updateARoomsValues(room) {
        this.updateARoomsPercentOfTotalSpace(room);
        this.updateARoomsPercentOfPrivateSpace(room);
    }

    updateARoomsPercentOfTotalSpace(room) {
        room.percentOfTotalSpace = this.Calculator.calculateARoomsPercentOfTotalSpace(room, this.area);
    }

    updateARoomsPercentOfPrivateSpace(room) {
        room.percentOfPrivateSpace = this.Calculator.calculateARoomsPercentOfPrivateSpace(room, this.privateSpace);
    }

    updateAreaRelatedValues() {
        this.commonSpace = this.Calculator.calculateCommonSpace(this.rooms, this.area);
        this.privateSpace = this.area - this.commonSpace;

        this.commonSpacePercentage = this.Calculator.calculateCommonSpacePercentage(this.area, this.commonSpace);
        this.privateSpacePercentage = 1 - this.commonSpacePercentage;

        this.commonSpaceValue = this.Calculator.calculateValueCommonSpace(this.rent, this.commonSpacePercentage);
        this.privateSpaceValue = this.rent - this.commonSpaceValue;

        // Update the values related to all the rooms, and then go an update each rooms values relative to the new totals.
        this.updateEachRoomsValues();
    }

    updatePaymentRelatedValues() {
        if (this.allRoomsAreValid()) {
            this.basePayment = this.Calculator.calculateBasePayment(this.rooms, this.commonSpaceValue);
            console.log('base payment: ' + this.basePayment);
            this.rooms.forEach(room => {
                // If the room has occupants then we can calculate a payment for it.
                if (room.occupants > 0 && room.area > 0) {
                    console.log('room ' + room.roomNumber + ' has occupants. calculating payment.');
                    this.updateARoomsPaymentRelatedValues(room);
                }
            });
        } else {
            console.log('all the rooms are not valid');
        }
    }

    updateARoomsPaymentRelatedValues(room) {
        room.eachOccupantsPercentOfPrivateSpace = room.percentOfPrivateSpace / room.occupants;

        room.privatePayment = this.privateSpaceValue * room.eachOccupantsPercentOfPrivateSpace;

        room.payment = this.basePayment + room.privatePayment;

        console.log(room.payment);
    }

    allRoomsAreValid() {
        let allRoomsAreValid = true;
        this.rooms.forEach(room => {
            if (room.occupants <= 0 || room.area <= 0 || room.area === '') {
                allRoomsAreValid = false;
            }
        });
        return allRoomsAreValid;
    }

    // removeRoomsWithNoOccupantsFromCalculations() {
    //     this.rooms.forEach(room => {
    //         // If the room has occupants then we can calculate a payment for it.
    //         if (room.occupants <= 0 || room.area <= 0) {
    //             console.log('room ' + room.roomNumber + ' has invalid configuration. removing from payment.');
    //             this.removeARoomFromPaymentCalculations(room);
    //         }
    //     });
    // }

    // removeARoomFromPaymentCalculations(room) {
    //     console.log(room.privatePayment);
    //     // Reset the rooms payment back to 0, since it no longer has any occupants.
    //     room.privatePayment = 0;
    //     room.payment = 0;
    //     // Remove the room from the private space area, and re add it to the common space area since we are no longer including it in our calculation.
    //     this.privateSpace -= room.area;
    //     this.commonSpace += room.area;
    //     this.occupants -= room.occupants;
    // }
}
