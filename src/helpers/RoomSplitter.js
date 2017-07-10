import Rooms from './Rooms.js';

export default class RoomSplitter {
    constructor(housingInformation) {
        console.log(housingInformation)
        this.roomData = new Rooms("new", 0, housingInformation);
    }


    footageUpdated(){
        
    }
}

