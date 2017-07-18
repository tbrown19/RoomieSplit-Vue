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

export function updateRoomConfigurationInDB(id, roomConfiguration) {
    // Update each room and assign the promise object to a variable.
    const updatedNumRooms = updateConfigurationNumRooms(id, roomConfiguration.numRooms);
    const updatedArea = updateConfigurationArea(id, roomConfiguration.area);
    const updatedRent = updateConfigurationRent(id, roomConfiguration.rent);

    return new Promise((resolve, reject) => {
        Promise.all([updatedNumRooms, updatedArea, updatedRent]).then(values => {
            // Do nothing on success. there is no need for the values to be returned as they are already in the store.
            resolve();
        }, error => {
            // If we get an error while updating any of the values then we reject the entire promise and return the error.
            reject(error);
        });
    });
}

function updateConfigurationNumRooms(id, numRooms) {
    return new Promise((resolve, reject) => {
        Database.ref('RoomConfigurations').child(id).child('numRooms').set(numRooms).then(() => {
            resolve();
        }, (error) => {
            reject(error);
        });
    });
}

function updateConfigurationArea(id, area) {
    return new Promise((resolve, reject) => {
        Database.ref('RoomConfigurations').child(id).child('area').set(area).then(() => {
            resolve();
        }, (error) => {
            reject(error);
        });
    });
}

function updateConfigurationRent(id, rent) {
    return new Promise((resolve, reject) => {
        Database.ref('RoomConfigurations').child(id).child('rent').set(rent).then(() => {
            resolve();
        }, (error) => {
            reject(error);
        });
    });
}
export function updateRoomConfigruationRoomsInDB(id, rooms) {
    return new Promise((resolve, reject) => {
        Database.ref('RoomConfigurations').child(id).child('rooms').set(rooms).then((roomConfiguration) => {
            resolve();
        }, (error) => {
            reject(error);
        });
    });
}
