import Rooms from './Rooms.js';

export default class RoomSplitter {
    constructor(housingInformation) {
        this.roomData = new Rooms("new", 0, housingInformation);
    }


    footageUpdated(){
        
    }
}

