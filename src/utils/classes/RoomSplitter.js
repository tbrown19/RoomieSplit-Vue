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
        this.Calculator = new Calculator();
        this.rooms = this.createRoomObjects();
        store.commit('SET_ROOMS', this.rooms);
        this.updateInitalValues();
    }

    createRoomObjects() {
        let rooms = [];
        for (let i = 0; i < store.getters.numRooms; i++) {
            rooms.push(new Room(store.getters.rooms[i], i + 1));
        }
        return rooms;
    }

    createEmptyRoomObjects() {
        let rooms = [];
        for (let i = 0; i < store.getters.numRooms; i++) {
            rooms.push(new Room([], i + 1));
        }
        console.log(rooms);
        return rooms;
    }

    clearRoomObjects() {
        this.createEmptyRoomObjects().forEach(function (room) {
            store.commit('UPDATE_A_ROOM', {
                roomsIndex: room.roomsIndex,
                value: room
            });
        }, this);
    }

    numberOfRoomsUpdated() {
        this.rooms = this.createRoomObjects();
        store.commit('SET_ROOMS', this.rooms);
    }

    updateInitalValues() {
        this.updateAreaRelatedValues();
        this.updatePaymentRelatedValues();
        this.updateEachRoomsValues();
    }

    updateEachRoomsValues() {
        store.getters.rooms.map((room) => this.updateARoomsValues(room));
    }

    updateARoomsValues(room) {
        this.updateARoomsPercentOfTotalSpace(room);
        this.updateARoomsPercentOfPrivateSpace(room);
    }

    updateARoomsPercentOfTotalSpace(room) {
        const percentOfTotalSpace = room.area / store.getters.area || 0;

        store.dispatch('percentTotalSpace', {
            roomsIndex: room.roomsIndex,
            value: percentOfTotalSpace
        });
    }

    updateARoomsPercentOfPrivateSpace(room) {
        const percentOfPrivateSpace = room.area / this.privateSpace || 0;

        store.dispatch('percentOfPrivateSpace', {
            roomsIndex: room.roomsIndex,
            value: percentOfPrivateSpace
        });
    }

    updateAreaRelatedValues() {
        const AREA = store.getters.area;

        this.commonSpace = this.Calculator.calculateCommonSpace(store.getters.rooms, AREA);

        this.privateSpace = AREA - this.commonSpace;

        this.commonSpacePercentage = this.commonSpace / AREA;

        this.privateSpacePercentage = 1 - this.commonSpacePercentage;

        // Update the values related to all the rooms, and then go an update each rooms values relative to the new totals.
        this.updateEachRoomsValues();
        this.checkForErrors();
    }

    checkForErrors() {
        if (this.privateSpace > store.getters.area) {
            store.commit('ADD_TABLE_ERROR', 'Area of all rooms cannot be greater than total area.');
        } else if (this.privateSpace < store.getters.area) {
            store.commit('REMOVE_TABLE_ERROR', 'Area of all rooms cannot be greater than total area.');
        }
    }

    updatePaymentRelatedValues() {
        // If all the rooms are valid, have area and occupants, and we have no other errors than we can calculate the payments for each room.
        if (this.allRoomsAreValid() && store.getters.getCurrentTableErrors.length === 0) {
            let valueAdjustedRent = store.getters.valueAdjustedRent;

            let commonSpaceValue = valueAdjustedRent * this.commonSpacePercentage;

            // Set the value to actually be the value divided by the modifier - the private payment will cover the value lost.
            this.commonSpaceValue = commonSpaceValue / store.getters.commonSpaceValueModifier;
            this.privateSpaceValue = (valueAdjustedRent - this.commonSpaceValue);

            this.basePayment = this.Calculator.calculateBasePayment(store.getters.rooms, this.commonSpaceValue);

            this.rooms.map((room) => this.updateARoomsPaymentRelatedValues(room));
        }
    }

    updateARoomsPaymentRelatedValues(room) {
        let roomsIndex = room.roomsIndex;

        const percentPrivateSpace = store.getters.percentOfPrivateSpace(roomsIndex);
        const occupantsInRoom = store.getters.occupants(roomsIndex);

        const eachOccupantsPercentOfPrivateSpace = percentPrivateSpace / occupantsInRoom;
        store.dispatch('eachOccupantsPercentOfPrivateSpace', {
            roomsIndex: roomsIndex,
            value: eachOccupantsPercentOfPrivateSpace
        });

        const privatePayment = this.privateSpaceValue * eachOccupantsPercentOfPrivateSpace;
        store.dispatch('privatePayment', {
            roomsIndex: roomsIndex,
            value: privatePayment
        });

        const positiveValues = store.getters.positiveValue(room.roomsIndex);
        const negativeValues = store.getters.negativeValue(room.roomsIndex);
        const payment = this.basePayment + privatePayment + positiveValues - negativeValues;

        store.dispatch('payment', {
            roomsIndex: roomsIndex,
            value: payment
        });
    }

    allRoomsAreValid() {
        let allRoomsAreValid = true;
        let adjustedRent = store.getters.rent;

        this.rooms.forEach(room => {
            // We set the rooms payment here to 0 because that way if all the rooms are not valid, the payment is already set to 0 and if they rooms are valid, the payment will be recalculated for each room anyways.
            let roomsIndex = room.roomsIndex;
            this.updateRoomsRentToZero(roomsIndex);
            // Adjust the rent and then check to see if we consider the room to be valid.
            adjustedRent = this.valueAdjustRentByRoomsIndex(adjustedRent, roomsIndex);
            // Only update the value if its already true, we don't want to change it if its false because if we have an invalid room - all rooms valid = false, but then the next room is valid it would overwrite it.
            if (allRoomsAreValid === true) {
                allRoomsAreValid = this.isRoomValid(roomsIndex);
            }
        });
        store.commit('SET_VALUE_ADJUSTED_RENT', adjustedRent);

        // This is used to know whether or not to show the graph action button.
        this.allRoomsAreValid = allRoomsAreValid;

        return allRoomsAreValid;
    }

    updateRoomsRentToZero(roomsIndex) {
        store.dispatch('payment', {
            roomsIndex: roomsIndex,
            value: 0
        });
    }

    isRoomValid(roomsIndex) {
        let room = store.getters.getRoomByNumber(roomsIndex);
        if (room.occupants <= 0 || room.area <= 0 || room.area === '') {
            return false;
        }
        return true;
    }

    valueAdjustRentByRoomsIndex(adjustedRent, roomsIndex) {
        adjustedRent = adjustedRent - store.getters.positiveValue(roomsIndex);
        adjustedRent = adjustedRent + store.getters.negativeValue(roomsIndex);
        return adjustedRent;
    }
}
