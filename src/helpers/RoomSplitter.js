import Rooms from './Rooms.js';

export default class RoomSplitter {
    constructor(store) {
        this.store = store;
        this.rooms = new Rooms("new", 3, 0, store);
        console.log(this.rooms);
    }

    
}

