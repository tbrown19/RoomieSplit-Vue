

export default class RoomSplitter {
    constructor() {
        this.rooms = new Rooms("new", 3, 0);
        console.log('bar');
    }
}


class Rooms {

    /**
     * Creates an instance of Rooms - which contains a collection of Room instances and helper methods to generate them.
     * @param {('new' | 'load')} creationMethod 
     * @param {Integer} numberRooms 
     * @param {Integer} savedRoomDataId 
     * @memberof Rooms
     */
    constructor(creationMethod, numberRooms, savedRoomDataId) {
        if (creationMethod === "load") {
            this.data = this.createRoomsFromDatabase(savedRoomDataId);
        }
        else{
            this.data = this.createEmptyRooms(numberRooms);
        }
    }

    /**
     * Creates the room data object by retreving an already saved instance of roomdata from the database. 
     * @param {Integer} roomsDataId 
     * @memberof Rooms
     */
    createRoomsFromDatabase(roomsDataId) {

    }


    /**
     *  Creates an array of length numRooms and intilizing all the values inside of it to be empty.
     * @param {Integer} numRooms 
     * @returns {Array} roomData
     * @memberof Rooms
     */
    createEmptyRooms(numRooms) {
        let roomData = [];
        for (let i = 1; i <= numRooms; i++) {
            roomData.push({
                room: i,
                length: {
                    feet: '',
                    inches: ''
                },
                width: {
                    feet: '',
                    inches: ''
                },
                footage: '',
                occupants: '',
                percentageTotal: 0,
                payment: 0
            });
        }
        return roomData;
    }
}