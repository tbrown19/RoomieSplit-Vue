
export const lengthFeet = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex].length.feet;
};

export const lengthInches = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex].length.inches;
};

export const widthFeet = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['width']['feet'];
};

export const widthInches = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['width']['inches'];
};

export const roomArea = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['area'];
};
export const occupants = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['occupants'];
};
export const percentOfTotalSpace = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['percentOfTotalSpace'];
};
export const percentOfPrivateSpace = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['percentOfPrivateSpace'];
};
export const eachOccupantsPercentOfPrivateSpace = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['eachOccupantsPercentOfPrivateSpace'];
};
export const privatePayment = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['occupants'];
};
export const payment = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['occupants'];
};
