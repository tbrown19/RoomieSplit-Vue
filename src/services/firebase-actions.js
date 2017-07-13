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
