import {
    getRoomConfiguration,
    updateRoomConfigurationInDB,
    updateRoomConfigruationRoomsInDB
} from '../../../services/firebase-actions.js';

export const loadRoomConfiguration = (context, routeId) => {
    // Make it known that we are current loading from the databse.
    context.commit('SET_LOADING_FROM_DATABASE', true);
    getRoomConfiguration(routeId).then((roomConfiguration) => {
        // We are done loading, and can update our room configuration to contain the loaded one.
        context.commit('SET_LOADING_FROM_DATABASE', false);
        context.commit('SET_ROOM_CONFIGURATION', roomConfiguration);
    }, (error) => {
        // We are done loading, but we got an error. update our error state to reflect this.
        context.commit('SET_LOADING_FROM_DATABASE', false);
        context.commit('SET_FIREBASE_ERROR', error);
    });
};

export const updateRoomConfiguration = (context, routeId) => {
    updateRoomConfigurationInDB(routeId, context.getters.roomConfiguration).then(() => {
        // maybe add something here about saving a room configuration. idk.
    }, (error) => {
        context.commit('SET_FIREBASE_ERROR', error);
    });
};

export const updateRooms = (context, routeId) => {
    context.commit('SET_SAVING_ROOMS_TO_DATABASE', true);
    updateRoomConfigruationRoomsInDB(routeId, context.getters.rooms).then(() => {
        context.commit('SET_SAVING_ROOMS_TO_DATABASE', false);
    }, (error) => {
        context.commit('SET_FIREBASE_ERROR', error);
    });
};
