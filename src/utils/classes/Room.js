import store from '../../store/index.js';
export default class Room {
    constructor(roomData, roomNumber) {
        if (roomData === undefined) {
            this.createEmptyRoom(roomNumber);
        } else {
            this.roomNumber = roomData.roomNumber;
            this.roomsIndex = roomData.roomNumber - 1;
            this.length = roomData.length;
            this.width = roomData.width;
            this.area = roomData.area;
            this.occupants = roomData.occupants;
            this.percentOfTotalSpace = roomData.percentOfTotalSpace;
            this.percentOfPrivateSpace = roomData.percentOfPrivateSpace;
            this.eachOccupantsPercentOfPrivateSpace = roomData.eachOccupantsPercentOfPrivateSpace;
            this.privatePayment = roomData.privatePayment;
            this.payment = roomData.payment;
        }
    }

    createEmptyRoom(roomNumber) {
        this.roomNumber = roomNumber;
        // Call clear since that function already initializes all the values to 0 except for room number anyways.
        this.clear();
    }

    clear() {
        this.length = {
            feet: '',
            inches: ''
        };

        this.width = {
            feet: '',
            inches: ''
        };

        this.area = '';

        this.occupants = 1;

        this.percentOfTotalSpace = 0;

        this.percentOfPrivateSpace = 0;

        this.eachOccupantsPercentOfPrivateSpace = 0;

        this.privatePayment = 0;

        this.payment = 0;
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
