import Room from './Room.js';
import Calculator from './RoomSplitterCalculator.js';
import store from '../../store/index.js';
export default class RoomSplitter {

    /**
     * Creates an instance of Rooms - which contains a collection of Room instances and helper methods to generate them.
     * @param {('new' | 'load')} creationMethod
     * @param {number} numberRooms
     * @param {number} savedRoomDataId
     * @memberof Rooms
     */
    constructor(roomConfiguration) {
        console.log(roomConfiguration);
        this.Calculator = new Calculator();
        this.roomConfiguration = roomConfiguration;
        this.numberRooms = roomConfiguration.numRooms;
        this.area = roomConfiguration.area;
        this.rent = roomConfiguration.rent;
        this.rooms = this.createRoomObjects();
        this.currentErrors = [];
        this.updateInitalValues();
    }

    createRoomObjects() {
        let rooms = [];
        for (let i = 0; i < this.numberRooms; i++) {
            rooms.push(new Room(this.roomConfiguration.rooms[i], i + 1));
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
        console.log('new number of rooms is ' + newNumberRooms);
        this.numberRooms = newNumberRooms;
        this.rooms = this.createRoomObjects();
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
        this.checkForErrors();
    }

    checkForErrors() {
        if (this.privateSpace > this.area) {
            store.commit('ADD_TABLE_ERROR', 'Area of all rooms cannot be greater than total area.');
        } else {
            store.commit('REMOVE_TABLE_ERROR', 'Area of all rooms cannot be greater than total area.');
        }
    }

    updatePaymentRelatedValues() {
        // If all the rooms are valid, have area and occupants, and we have no other errors than we can calculate the payments for each room.
        if (this.allRoomsAreValid() && store.getters.getCurrentTableErrors.length === 0) {
            this.basePayment = this.Calculator.calculateBasePayment(this.rooms, this.commonSpaceValue);
            this.rooms.forEach(room => {
                this.updateARoomsPaymentRelatedValues(room);
            });
        }
    }

    updateARoomsPaymentRelatedValues(room) {
        room.eachOccupantsPercentOfPrivateSpace = room.percentOfPrivateSpace / room.occupants;

        room.privatePayment = this.privateSpaceValue * room.eachOccupantsPercentOfPrivateSpace;

        room.payment = this.basePayment + room.privatePayment;
    }

    allRoomsAreValid() {
        let allRoomsAreValid = true;
        this.rooms.forEach(room => {
            // We set the rooms payment here to 0 because that way if all the rooms are not valid, the payment is already set to 0
            // and if they rooms are valid, the payment will be recalculated for each room anyways.
            room.payment = 0;
            if (room.occupants <= 0 || room.area <= 0 || room.area === '') {
                allRoomsAreValid = false;
            }
        });
        return allRoomsAreValid;
    }
}
