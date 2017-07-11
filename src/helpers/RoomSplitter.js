import Rooms from './Rooms.js';
import { Database } from '../firebase.js';

export default class RoomSplitter {
    constructor(housingInformation) {
        console.log(housingInformation)
        this.housingInformation = housingInformation;
        this.roomData = new Rooms("new", 0, housingInformation);
    }

}

