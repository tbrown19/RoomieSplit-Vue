import Rooms from './Rooms.js';

export default class RoomSplitter {
    constructor(roomConfiguration) {
        console.log(roomConfiguration);
        this.roomConfiguration = roomConfiguration;
        this.roomData = new Rooms(roomConfiguration);
    }

}

