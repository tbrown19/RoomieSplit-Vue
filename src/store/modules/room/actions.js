export const lengthFeet = (context, {roomsIndex, value}) => {
    context.commit(
        'UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
            roomsIndex: roomsIndex,
            attribute: 'length',
            nested: 'feet',
            value: value
        });
};

export const lengthInches = (context, {roomsIndex, value}) => {
    context.commit(
        'UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
            roomsIndex: roomsIndex,
            attribute: 'length',
            nested: 'inches',
            value: value
        });
};

export const widthFeet = (context, {roomsIndex, value}) => {
    context.commit(
        'UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
            roomsIndex: roomsIndex,
            attribute: 'width',
            nested: 'feet',
            value: value
        });
};

export const widthInches = (context, {roomsIndex, value}) => {
    context.commit(
        'UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
            roomsIndex: roomsIndex,
            attribute: 'width',
            nested: 'inches',
            value: value
        });
};

export const roomsArea = (context, {roomsIndex, value}) => {
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: 'area',
        value: value
    });
};

export const occupants = (context, {roomsIndex, value}) => {
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: 'occupants',
        value: value
    });
};

export const percentTotalSpace = (context, {roomsIndex, value}) => {
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: 'percentOfTotalSpace',
        value: value
    });
};

export const percentOfPrivateSpace = (context, {roomsIndex, value}) => {
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: 'percentOfPrivateSpace',
        value: value
    });
};

export const eachOccupantsPercentOfPrivateSpace = (context, {roomsIndex, value}) => {
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: 'eachOccupantsPercentOfPrivateSpace',
        value: value
    });
};

export const privatePayment = (context, {roomsIndex, value}) => {
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: 'privatePayment',
        value: value
    });
};

export const payment = (context, {roomsIndex, value}) => {
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: 'payment',
        value: value
    });
};

export const note = (context, {roomsIndex, value}) => {
    let note = value.replace(/[^a-z0-9']+/ig, ' ');
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: 'note',
        value: note
    });
};

export const setTotalValue = (context, {roomsIndex, type, value}) => {
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: type + 'Value',
        value: value
    });
};

export const addValue = (context, {roomsIndex, type, name, value}) => {
    let currentValues = context.getters.valuesByType(roomsIndex, type) || {};

    let cleanedName = name.replace(/[^a-z']+/ig, ' ');
    currentValues[cleanedName] = value;

    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: type + 'Values',
        value: currentValues
    });
};

export const addToTotalValue = (context, {roomsIndex, type, value}) => {
    let currentTotal = context.getters.totalValueByType(roomsIndex, type);

    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: type + 'Value',
        value: currentTotal + value
    });
};

export const removeValue = (context, {roomsIndex, type, name}) => {
    let currentValues = context.getters.valuesByType(roomsIndex, type) || {};
    delete currentValues[name];

    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: type + 'Values',
        value: currentValues
    });
};

export const subtractFromTotalValue = (context, {roomsIndex, type, value}) => {
    let currentTotal = context.getters.totalValueByType(roomsIndex, type);

    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: roomsIndex,
        attribute: type + 'Value',
        value: currentTotal - value
    });
};

// Find why this was being used.
// export const updateValue = (context, payload) => {
//     console.log('when do we call this?');
//     let currentValues = {};
//     // state.percentOfTotalSpace = percentage;
//     currentValues = context.getters.valuesByType(
//         payload.roomsIndex, payload.type);

//     currentValues[payload.name] = payload.value;

//     const attribute = payload.type + 'Values';
//     context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
//         roomsIndex: payload.roomsIndex,
//         attribute: attribute,
//         value: currentValues
//     });
// };
