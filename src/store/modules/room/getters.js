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

export const roomArea = (state, getters, rootState) => (roomsIndex, caller) => {
    // the getters try to preload themselves. add the if statement to check to make sure its not
    // doing that, other wise it causes an error.
    // https://stackoverflow.com/questions/43218643/vue-js-vuex-getters-error-before-state-rendered
    if (roomsIndex === undefined) return;
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
    return getters.rooms[roomsIndex]['privatePayment'];
};

export const payment = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['payment'];
};

export const note = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['note'];
};

export const positiveValue = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['positiveValue'];
};

export const positiveValues = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['positiveValues'];
};

export const negativeValue = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['negativeValue'];
};

export const negativeValues = (state, getters, rootState) => (roomsIndex) => {
    return getters.rooms[roomsIndex]['negativeValues'];
};

export const valuesByType = (state, getters, rootState) => (roomsIndex, type) => {
    const valuesName = type + 'Values';
    return getters.rooms[roomsIndex][valuesName];
};

export const totalValueByType = (state, getters, rootState) => (roomsIndex, type) => {
    const valuesName = type + 'Value';
    return getters.rooms[roomsIndex][valuesName];
};
