export default class RoomSplitter {
    constructor() {
        this.rooms = new Rooms("new", 3, 0);
        console.log('bar');
    }
}


class Rooms {

    /**
     * Creates an instance of Rooms - which contains a collection of Room instances and helper methods to generate them.
     * @param {String} creationMethod 
     * @param {Integer} numberRooms 
     * @param {Integer} savedRoomDataID 
     * @memberof Rooms
     */
    constructor(creationMethod, numberRooms, savedRoomDataID) {
        if (storedRoomDataID) {
            
        }
    }

    createRoomsFromDatabase() {

    }

    createEmptyRooms(rooms) {
        let roomData = [];
        for (let i = 1; i <= rooms; i++) {
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