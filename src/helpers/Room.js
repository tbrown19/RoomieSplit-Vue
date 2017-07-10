export default class Room {
    constructor(roomNumber, roomData, housingInformation) {
        this.housingInformation = housingInformation;
        //If we are passed in room data create the object from that, otherwise create a blank one.
        if (roomData) {
            //Do something about destructing this into varibles on the class and whatever.
        } else {
            this.roomNumber = roomNumber
            this.length = {
                feet: '',
                inches: ''
            }

            this.width = {
                feet: '',
                inches: ''
            }

            this.area = ''

            this.occupants = 0

            this.percentOfTotalSpace = 0

            this.percentOfPrivateSpace = 0

            this.eachOccupantsPercentOfPrivateSpace = 0;

            this.privatePayment = 0;

            this.payment = 0

        }
    }

    clear() {
        this.length = {
            feet: '',
            inches: ''
        }

        this.width = {
            feet: '',
            inches: ''
        }

        this.area = ''

        this.occupants = 0

        this.percentOfTotalSpace = 0

        this.percentOfPrivateSpace = 0

        this.eachOccupantsPercentOfPrivateSpace = 0;

        this.privatePayment = 0;

        this.payment = 0
    }

    calculateFromMeasurements() {
        let lengthFeet = this.length.feet;
        let lengthInches = this.length.inches;
        let totalLength = lengthFeet + (lengthInches / 12);

        let widthFeet = this.width.feet;
        let widthInches = this.width.inches;
        let totalWidth = widthFeet + (widthInches / 12);

        return totalLength * totalWidth;
    }

    calculateArea() {
        this.area = this.calculateFromMeasurements();
        this.areaUpdated();
    }

    calculatePercentOfTotalSpace() {
        const totalArea = this.housingInformation.area;
        return this.area / totalArea;
    }

    areaUpdated() {
        this.percentOfTotalSpace = this.calculatePercentOfTotalSpace();
    }
}