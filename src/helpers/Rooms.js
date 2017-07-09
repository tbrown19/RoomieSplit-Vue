import Room from './Room.js';

export default class Rooms {

    /**
     * Creates an instance of Rooms - which contains a collection of Room instances and helper methods to generate them.
     * @param {('new' | 'load')} creationMethod 
     * @param {Integer} numberRooms 
     * @param {Integer} savedRoomDataId 
     * @memberof Rooms
     */
    constructor(creationMethod, numberRooms, savedRoomDataId, store) {
        this.store = store;

        this.numberRooms = store.state.housingInformation.rooms.value;
        this.footage = store.state.housingInformation.footage.value;
        this.rent = store.state.housingInformation.rent.value;


        if (creationMethod === "load") {
            this.roomData = this.createRoomsFromDatabase(savedRoomDataId);
        } else {
            this.roomData = this.createEmptyRooms(numberRooms);
        }
    }

    /**
     * Creates the room data object by retreving an already saved instance of roomdata from the database. 
     * @param {Integer} roomsDataId 
     * @memberof Rooms
     */
    createRoomsFromDatabase(roomsDataId) {}

    /**
     *  Creates an array of length numRooms and intilizing all the values inside of it to be empty.
     * @param {Integer} numRooms 
     * @returns {Array} roomData
     * @memberof Rooms
     */
    createEmptyRooms(numRooms) {
        let roomData = [];
        for (let i = 1; i <= numRooms; i++) {
            roomData.push(new Room(i, "", this.store));
        }
        return roomData;
    }



    calculateTotalRoomsFootage() {
        return this.sumValueOfRoomData(this.roomData, 'footage');
    }

    calculateTotalOccupants() {
        return this.sumValueOfRoomData(this.roomData, 'occupants');
    }


    calculateCommonSpace() {
        const totalRoomsFootage = this.calculateTotalRoomsFootage();
        const totalFootage = this.footage;
        return totalFootage - totalRoomsFootage;
    }

    calculateCommonSpacePercentage() {
        const totalFootage = this.footage;
        const commonSpaceFootage = this.calculateCommonSpace();
        return commonSpaceFootage / totalFootage;
    }

    calculateValueCommonSpace() {
        const commonSpacePercentage = this.calculateCommonSpacePercentage();
        const rent = this.rent;
        return rent * commonSpacePercentage;
    }

    calculateFootageRelatedValues() {

        this.commonSpace = this.calculateCommonSpace();
        this.privateSpace = this.footage - this.calculateCommonSpace();

        this.commonSpacePercentage = this.calculateCommonSpacePercentage();
        this.privateSpacePercentage = 1 - this.commonSpacePercentage;

        this.commonSpaceValue = this.calculateValueCommonSpace();
        this.privateSpaceValue = this.rent - this.commonSpaceValue;

        console.log(this);
    }


    calculateBasePayment() {
        const numberOccupants = this.sumValueOfRoomData(this.roomData, "occupants");
        return this.commonSpaceValue / numberOccupants;
    }


    calculatePaymentRelatedValues() {
        this.basePayment = this.calculateBasePayment();
        console.log( this.basePayment);
        this.roomData.forEach(room => {
            //If the room has occupants then we can calculate a payment for it. 
            if (room.occupants > 0) {
                console.log('calculating payment for room ' + room.roomNumber)
                this.calculatePaymentForRoom(room)
            }
            else{
                room.privatePayment = 0;
                room.payment = 0;
                this.privateSpace -= room.footage;
                this.commonSpace += room.footage;
            }
        });
    }
    
    calculatePaymentForRoom(room) {
        room.percentOfPrivateSpace = room.footage / this.privateSpace;
        room.eachOccupantsPercentOfPrivateSpace = room.percentOfPrivateSpace / room.occupants;
        room.privatePayment = this.privateSpaceValue * room.eachOccupantsPercentOfPrivateSpace;
        let totalPayment =  this.basePayment + room.privatePayment;
        room.payment = parseFloat(totalPayment).toFixed(2);
    }


    sumValueOfRoomData(roomData, valueToSum) {
        let valuesToSum = roomData.map(function (room) {
            return parseFloat(room[valueToSum]) || 0;
        });
        console.log(valuesToSum);
        return valuesToSum.reduce((total, currentValue) => total + currentValue);
    }


}