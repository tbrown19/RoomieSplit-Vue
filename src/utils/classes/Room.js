import store from '../../store/index.js';
export default class Room {
    constructor(roomData, roomNumber) {
        if (roomData === undefined || roomData.length === 0) {
            this.createEmptyRoom(roomNumber);
        } else {
            for (let dataName in roomData) {
                this[dataName] = roomData[dataName];
            }
            this.roomsIndex = this.roomNumber - 1;
        }
    }

    createEmptyRoom(roomNumber) {
        this.roomNumber = roomNumber;
        this.roomsIndex = roomNumber - 1;
        // Call clear since that function already initializes all the values to 0 except for room number anyways.
        this.clear();
    }

    clear() {
        console.log('why is this not a function');
        let tempRoom = {
            roomNumber: this.roomNumber,

            roomsIndex: this.roomsIndex,

            length: {
                feet: '',
                inches: ''
            },

            width: {
                feet: '',
                inches: ''
            },

            area: '',

            occupants: 1,

            percentOfTotalSpace: 0,

            percentOfPrivateSpace: 0,

            eachOccupantsPercentOfPrivateSpace: 0,

            privatePayment: 0,

            payment: 0,

            positiveValue: 0,

            positiveValues: '',

            negativeValue: 0,

            negativeValues: '',

            notes: ''
        };
        store.commit('UPDATE_A_ROOM', {
            roomsIndex: this.roomsIndex,
            value: tempRoom
        });
    }

    updateAreaFromInputs(area) {
        store.dispatch('roomsArea', {
            roomsIndex: this.roomsIndex,
            value: area
        });
        // Clear the measurements since they will no longer be valid if the user manually changed the area
        store.dispatch('lengthFeet', {
            roomsIndex: this.roomsIndex,
            value: ''
        });
        store.dispatch('lengthInches', {
            roomsIndex: this.roomsIndex,
            value: ''
        });
        store.dispatch('widthFeet', {
            roomsIndex: this.roomsIndex,
            value: ''
        });
        store.dispatch('widthInches', {
            roomsIndex: this.roomsIndex,
            value: ''
        });
    }

    updateAreaFromMeasurements() {
        let calculatedArea = this.calculateAreaFromMeasurements();
        store.dispatch('roomsArea', {
            roomsIndex: this.roomsIndex,
            value: calculatedArea
        });
    }

    calculateAreaFromMeasurements() {
        let lengthFeet = store.getters.lengthFeet(this.roomsIndex);
        let lengthInches = store.getters.lengthInches(this.roomsIndex);
        let totalLength = lengthFeet + (lengthInches / 12);

        let widthFeet = store.getters.widthFeet(this.roomsIndex);
        let widthInches = store.getters.widthInches(this.roomsIndex);
        let totalWidth = widthFeet + (widthInches / 12);

        return totalLength * totalWidth;
    }

}
