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
        this.rooms = this.createRoomObjects();
        this.updateInitalValues();
    }

    createRoomObjects() {
        let rooms = [];
        for (let i = 0; i < store.getters.numRooms; i++) {
            rooms.push(new Room(store.getters.rooms[i], i + 1));
        }
        return rooms;
    }

    clearRoomObjects() {
        this.rooms.forEach(room => {
            room.clear();
        });
    }

    /**
     * @memberof Rooms
     */
    numberOfRoomsUpdated() {
        this.rooms = this.createRoomObjects();
    }

    updateInitalValues() {
        this.updateAreaRelatedValues();
        this.updatePaymentRelatedValues();
        this.updateEachRoomsValues();
    }

    updateEachRoomsValues() {
        for (let i = 0; i < store.getters.numRooms; i++) {
            this.updateARoomsValues(store.getters.rooms[i]);
        }
    }

    updateARoomsValues(room) {
        this.updateARoomsPercentOfTotalSpace(room);
        this.updateARoomsPercentOfPrivateSpace(room);
    }

    updateARoomsPercentOfTotalSpace(room) {
        // let newRoom = [...room];
        const percentOfTotalSpace = this.Calculator.calculateARoomsPercentOfTotalSpace(room, store.getters.area);
        store.dispatch('percentTotalSpace', {
            roomsIndex: room.roomsIndex,
            value: percentOfTotalSpace
        });
    }

    updateARoomsPercentOfPrivateSpace(room) {
        console.log('private space before we update a rooms private space ' + this.privateSpace);
        const percentOfPrivateSpace = this.Calculator.calculateARoomsPercentOfPrivateSpace(room, this.privateSpace);
        console.log('percent of private sapce is ' + percentOfPrivateSpace);
        store.dispatch('percentOfPrivateSpace', {
            roomsIndex: room.roomsIndex,
            value: percentOfPrivateSpace
        });
        console.log('percent of private sapce in store is  ' + percentOfPrivateSpace);
    }

    updateAreaRelatedValues() {
        this.commonSpace = this.Calculator.calculateCommonSpace(store.getters.rooms, store.getters.area);
        this.privateSpace = store.getters.area - this.commonSpace;

        this.commonSpacePercentage = this.Calculator.calculateCommonSpacePercentage(store.getters.area, this.commonSpace);
        this.privateSpacePercentage = 1 - this.commonSpacePercentage;
        // Update the values related to all the rooms, and then go an update each rooms values relative to the new totals.
        this.updateEachRoomsValues();
        this.checkForErrors();
    }

    checkForErrors() {
        if (this.privateSpace > store.getters.area) {
            store.commit('ADD_TABLE_ERROR', 'Area of all rooms cannot be greater than total area.');
        } else {
            store.commit('REMOVE_TABLE_ERROR', 'Area of all rooms cannot be greater than total area.');
        }
    }

    updatePaymentRelatedValues() {
        console.log('are we ever even calling update payment');
        // If all the rooms are valid, have area and occupants, and we have no other errors than we can calculate the payments for each room.
        if (this.allRoomsAreValid() && store.getters.getCurrentTableErrors.length === 0) {
            console.log('do we get into here?');
            this.commonSpaceValue = this.Calculator.calculateValueCommonSpace(store.getters.rent, this.commonSpacePercentage);
            this.privateSpaceValue = store.getters.rent - this.commonSpaceValue;

            this.basePayment = this.Calculator.calculateBasePayment(store.getters.rooms, this.commonSpaceValue);
            console.log('base payment: ' + this.basePayment);
            this.rooms.forEach(room => {
                this.updateARoomsPaymentRelatedValues(room);
            });
        }
    }

    updateARoomsPaymentRelatedValues(room) {
        let roomsIndex = room.roomsIndex;
        console.log('percent private space in updateARoomsPaymentRelatedValues : ' + store.getters.percentOfPrivateSpace(roomsIndex));
        const eachOccupantsPercentOfPrivateSpace = store.getters.percentOfPrivateSpace(roomsIndex) / store.getters.occupants(roomsIndex);
        console.log('eachOccupantsPercentOfPrivateSpace: ' + eachOccupantsPercentOfPrivateSpace);
        store.dispatch('eachOccupantsPercentOfPrivateSpace', {
            roomsIndex: roomsIndex,
            value: eachOccupantsPercentOfPrivateSpace
        });

        const privatePayment = this.privateSpaceValue * eachOccupantsPercentOfPrivateSpace;
        console.log('privatePayment: ' + privatePayment);
        store.dispatch('privatePayment', {
            roomsIndex: roomsIndex,
            value: privatePayment
        });

        const payment = this.basePayment + privatePayment;
        store.dispatch('payment', {
            roomsIndex: roomsIndex,
            value: payment
        });
    }

    allRoomsAreValid() {
        let allRoomsAreValid = true;
        this.rooms.forEach(currentRoom => {
            // We set the rooms payment here to 0 because that way if all the rooms are not valid, the payment is already set to 0
            // and if they rooms are valid, the payment will be recalculated for each room anyways.
            store.dispatch('payment', {
                roomsIndex: currentRoom.roomsIndex,
                value: 0
            });

            let room = store.getters.getRoomByNumber(currentRoom.roomsIndex);
            if (room.occupants <= 0 || room.area <= 0 || room.area === '') {
                allRoomsAreValid = false;
            }
        });
        return allRoomsAreValid;
    }
}
