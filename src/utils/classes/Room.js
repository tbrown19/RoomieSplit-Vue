export default class Room {
    constructor(roomData, roomNumber) {
        this.roomData = roomData;
        this.roomNumber = roomData.roomNumber;
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

        this.occupants = 0;

        this.percentOfTotalSpace = 0;

        this.percentOfPrivateSpace = 0;

        this.eachOccupantsPercentOfPrivateSpace = 0;

        this.privatePayment = 0;

        this.payment = 0;
    }

    updateAreaFromInputs(area) {
        this.area = area;
        // Clear the measurements since they will no longer be valid if the user manually changed the area
        this.length.feet = '';
        this.length.inches = '';
        this.width.feet = '';
        this.width.inches = '';
    }

    updateAreaFromMeasurements() {
        this.area = this.calculateAreaFromMeasurements();
        console.log(this.area);
    }

    calculateAreaFromMeasurements() {
        let lengthFeet = this.length.feet;
        let lengthInches = this.length.inches;
        let totalLength = lengthFeet + (lengthInches / 12);

        let widthFeet = this.width.feet;
        let widthInches = this.width.inches;
        let totalWidth = widthFeet + (widthInches / 12);

        return totalLength * totalWidth;
    }

}
