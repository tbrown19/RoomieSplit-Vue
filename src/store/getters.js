export const roomConfiguration = state => {
    return {
        'numRooms': state.numRooms,
        'area': state.area,
        'rent': state.rent,
        'rooms': state.rooms
    };
};

export const numRooms = state => state.numRooms;

export const area = state => state.area;

export const rent = state => state.rent;

export const rooms = state => state.rooms;

export const getRoomByNumber = (state, getters) => (roomNumber) => {
    return state.getters.getRooms[roomNumber];
};

export const getCurrentTableErrors = state => state.currentTableErrors;

export const isLoadingFromDatabase = state => state.loadingFromDatabase;

export const getFirebaseActionErrors = state => state.firebaseActionErrors;

export const isSavingRoomsToDatabase = state => state.savingRoomsToDatabase;
