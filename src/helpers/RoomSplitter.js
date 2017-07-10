import Rooms from './Rooms.js';

export default class RoomSplitter {
    constructor(store) {
        this.store = store;
        this.rooms = new Rooms("new", 0, this.store.state.housingInformation);
    }

    
}

