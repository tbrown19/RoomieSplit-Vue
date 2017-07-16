import {
    Database
} from './firebase.js';

import {
    createEmptyRooms
} from '../utils/helpers/generate-empty-rooms.js';

export function addRoomConfiguration(roomConfiguration) {
    roomConfiguration.rooms = createEmptyRooms(roomConfiguration.numRooms);
    // Add the newly created room configuration to the database and then return its unique key
    return new Promise((resolve, reject) => {
        Database.ref('RoomConfigurations').push(roomConfiguration).then((snap) => {
            if (snap.key.length > 0) {
                resolve(snap.key);
            } else {
                reject('Failed to store room configuration in database.');
            }
        });
    });
}

export function getRoomConfiguration(id) {
    return new Promise((resolve, reject) => {
        Database.ref('RoomConfigurations/' + id).once('value').then((roomConfiguration) => {
            if (roomConfiguration.val() == null) {
                reject('No roomie split configuration found for this link. Please check the link you entered and try again.');
            } else {
                resolve(roomConfiguration.val());
            }
        }, (error) => {
            reject(error);
        });
    });
}

export function updateRoomConfiguration(id, roomConfiguration) {
    const currentRoom = Database.ref('RoomConfigurations').child(id);
    // currentRoom.set({
    //     numRooms: roomConfiguration.numRooms,
    //     area: roomConfiguration.area,
    //     rent: roomConfiguration.rent
    // });
    currentRoom.child('numRooms').set(roomConfiguration.numRooms);
    currentRoom.child('area').set(roomConfiguration.area);
    currentRoom.child('rent').set(roomConfiguration.rent);
}

export function updateRoomConfigruationRooms(id, rooms) {
    const currentRoom = Database.ref('RoomConfigurations').child(id);

    return new Promise((resolve, reject) => {
        currentRoom.child('rooms').set(rooms).then((roomConfiguration) => {
            resolve();
        }, (error) => {
            reject(error);
        });
    });
}
