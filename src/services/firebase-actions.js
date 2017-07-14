import {
    Database
} from './firebase.js';

export function addRoomConfiguration(roomConfiguration) {
    console.log(roomConfiguration);
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
                reject('No roomie split configuration found for this link.');
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
    currentRoom.child('numRooms').set(roomConfiguration.numRooms);
    currentRoom.child('area').set(roomConfiguration.area);
    currentRoom.child('rent').set(roomConfiguration.rent);
}
