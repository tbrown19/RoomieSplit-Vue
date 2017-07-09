import Rooms from './Rooms.js';

export default class RoomSplitter {
    constructor() {
        this.rooms = new Rooms("new", 3, 0);
        console.log(this.rooms);
    }
}

