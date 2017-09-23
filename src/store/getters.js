export const roomConfiguration = state => {
    return {
        'numRooms': state.numRooms,
        'area': state.area,
        'rent': state.rent,
        'valueAdjustedRent': state.valueAdjustedRent,
        'commonSpaceValueModifier': state.commonSpaceValueModifier,
        'rooms': state.rooms
    };
};

export const numRooms = state => state.numRooms;

export const area = state => state.area;

export const rent = state => state.rent;

export const valueAdjustedRent = state => state.valueAdjustedRent;

export const rooms = state => state.rooms;

export const commonSpaceValueModifier = state => state.commonSpaceValueModifier;

export const getRoomByNumber = (state, getters) => (roomNumber) => getters.rooms[roomNumber];

export const getRoomAttribute = (state, getters) => (payload) => {
    return getters.getRoomByNumber(payload.roomsIndex)[payload.attr];
};
export const getCurrentTableErrors = state => state.currentTableErrors;

export const getRoomsFootageAsArray = (state, getters) => {
    let rooms = getters.rooms;
    return rooms.map(room => {
        return getters.roomArea(room.roomsIndex);
    });
};

export const totalPrivateSpace = (state, getters) => {
    let roomsFootage = getters.getRoomsFootageAsArray;
    return roomsFootage.reduce((currentValue, nextValue) => currentValue + nextValue, 0);
};

export const totalCommonSpace = (state, getters) => {
    return getters.area - getters.totalPrivateSpace;
};
