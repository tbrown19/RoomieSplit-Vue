// initial state
const state = {
    percentOfTotalSpace: 0
};

// getters
const getters = {
    percentOfTotalSpace: state => state.percentOfTotalSpace
};

// actions
const mutations = {
    UPDATE_PERCENTAGE_TOTAL_SAPCE(context, payload) {
        // state.percentOfTotalSpace = percentage;
        console.log(context);
        console.log('room @ index: ' + payload.roomsIndex);
        console.log(payload.percentage);
    }
};

// mutations
const actions = {
    updateARoomsPercentOfTotalSpace(context, payload) {
        // state.percentOfTotalSpace = percentage;
        console.log(context);
        console.log('room @ index: ' + payload.room);
        console.log(payload.percentage);
        context.commit('UPDATE_A_ROOMS_ATTRIBUTE', {
            roomsIndex: payload.roomsIndex,
            attribute: 'percentOfTotalSpace',
            value: payload.percentage
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
