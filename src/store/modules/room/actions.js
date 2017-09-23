export const lengthFeet = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit(
        'UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
            roomsIndex: payload.roomsIndex,
            attribute: 'length',
            nested: 'feet',
            value: payload.value
        });
};

export const lengthInches = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit(
        'UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
            roomsIndex: payload.roomsIndex,
            attribute: 'length',
            nested: 'inches',
            value: payload.value
        });
};

export const widthFeet = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit(
        'UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
            roomsIndex: payload.roomsIndex,
            attribute: 'width',
            nested: 'feet',
            value: payload.value
        });
};

export const widthInches = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit(
        'UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
            roomsIndex: payload.roomsIndex,
            attribute: 'width',
            nested: 'inches',
            value: payload.value
        });
};

export const roomsArea = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'area',
        value: payload.value
    });
};

export const occupants = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'occupants',
        value: payload.value
    });
};

export const percentTotalSpace = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'percentOfTotalSpace',
        value: payload.value
    });
};

export const percentOfPrivateSpace = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'percentOfPrivateSpace',
        value: payload.value
    });
};

export const eachOccupantsPercentOfPrivateSpace = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'eachOccupantsPercentOfPrivateSpace',
        value: payload.value
    });
};

export const privatePayment = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'privatePayment',
        value: payload.value
    });
};

export const payment = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'payment',
        value: payload.value
    });
};

export const note = (context, payload) => {
    let note = payload.value.replace(
        /[^a-z0-9']+/ig, ' ');
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'note',
        value: note
    });
};

export const setTotalValue = (context, payload) => {
    const attribute = payload.type + 'Value';
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: attribute,
        value: payload.value
    });
};

export const addValue = (context, payload) => {
    let currentValues = {};
    // Get either the positive or negative values.
    currentValues = context.getters.valuesByType(
        payload.roomsIndex, payload.type) || {};
    // Add the new one.
    let name = payload.name.replace(
        /[^a-z']+/ig, ' ');
    currentValues[name] = payload.value;
    // Then commit it.
    const attribute = payload.type + 'Values';

    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: attribute,
        value: currentValues
    });
};

export const addToTotalValue = (context, payload) => {
    let currentTotal = context.getters.totalValueByType(
        payload.roomsIndex, payload.type);
    // Add the new one.
    currentTotal += payload.value;
    // Then commit it.
    const attribute = payload.type + 'Value';

    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: attribute,
        value: currentTotal
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
