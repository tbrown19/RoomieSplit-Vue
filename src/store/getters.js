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
    return getters.rooms[roomNumber];
};
export const getRoomAttribute = (state, getters) => (payload) => {
    return getters.getRoomByNumber(payload.roomsIndex)[payload.attr];
};
export const getCurrentTableErrors = state => state.currentTableErrors;
