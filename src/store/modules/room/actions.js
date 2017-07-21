export const lengthFeet = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'length',
        nested: 'feet',
        value: payload.value
    });
};

export const lengthInches = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'length',
        nested: 'inches',
        value: payload.value
    });
};

export const widthFeet = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'width',
        nested: 'feet',
        value: payload.value
    });
};

export const widthInches = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_NESTED_ATTRIBUTE', {
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
    let note = payload.value.replace(/[^a-z0-9']+/ig, ' ');
    // state.percentOfTotalSpace = percentage;
    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'note',
        value: note
    });
};

export const addAdditionalValue = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    let currentValues = context.getters.additionalValues;
    currentValues[payload.name] = payload.value;

    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'additionalValues',
        value: currentValues
    });
};
export const removeAdditionalValue = (context, payload) => {
    // state.percentOfTotalSpace = percentage;
    let currentValues = context.getters.additionalValues;
    delete currentValues[payload.name];

    context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
        roomsIndex: payload.roomsIndex,
        attribute: 'additionalValues',
        value: currentValues
    });
};
