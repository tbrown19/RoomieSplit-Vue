export default class Room {
    constructor(roomNumber, roomData, store) {
        console.log("creating new room!");
        this.store = store;
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

            this.footage = ''

            this.occupants = 0

            this.percentOfTotalSpace = 0
            
            this.percentOfPrivateSpace = 0

            this.eachOccupantsPercentOfPrivateSpace = 0;
            
            this.privatePayment = 0;

            this.payment = 0

        }
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

    calculateFootage() {
        this.footage = this.calculateFromMeasurements();
        this.footageUpdated();
    }

    calculatePercentOfTotalSpace() {
        const totalFootage = this.store.state.housingInformation.footage.value;
        return this.footage / totalFootage;
    }

    footageUpdated() {
        this.percentOfTotalSpace = this.calculatePercentOfTotalSpace();
    }
}