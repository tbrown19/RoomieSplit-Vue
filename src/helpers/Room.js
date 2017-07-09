export default class Room {
    constructor(roomNumber, roomData) {
        console.log("creating new room!");
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

            this.occupants = ''

            this.percentageTotal = 0

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

    calculateFootage(method) {
        this.footage = this.calculateFromMeasurements();
    }

}