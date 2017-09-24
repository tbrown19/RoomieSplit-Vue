import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
// import * as actions from './actions';
import room from './modules/room/room.js';
import firebase from './modules/firebase/firebase.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    modules: {
        room,
        firebase
    },
    state: {
        numRooms: 0,
        area: 0,
        rent: 0,
        valueAdjustedRent: 0,
        commonSpaceValueModifier: 0,
        rooms: [],
        currentTableErrors: []
    },

    getters,
    // actions,
    mutations: {
        SET_NUM_ROOMS(state, numRooms) {
            state.numRooms = numRooms;
        },
        SET_AREA(state, area) {
            state.area = area;
        },
        SET_RENT(state, rent) {
            state.rent = rent;
        },
        SET_VALUE_ADJUSTED_RENT(state, rent) {
            state.valueAdjustedRent = rent;
        },
        SET_COMMON_SPACE_VALUE_MODIFIER(state, commonSpaceValueModifier) {
            state.commonSpaceValueModifier = commonSpaceValueModifier;
        },
        SET_ROOMS(state, rooms) {
            state.rooms = rooms;
        },
        SET_ROOM_CONFIGURATION(state, roomConfiguration) {
            state.numRooms = roomConfiguration.numRooms;
            state.area = roomConfiguration.area;
            state.rent = roomConfiguration.rent;
            state.commonSpaceValueModifier = roomConfiguration.commonSpaceValueModifier;
            state.rooms = roomConfiguration.rooms;
        },
        UPDATE_A_ROOM(state, payload) {
            state.rooms[payload.roomsIndex] = payload.value;
        },
        UPDATE_A_ROOMS_ATTRIBUTE(state, payload) {
            state.rooms[payload.roomsIndex][payload.attribute] = payload.value;
        },
        UPDATE_A_ROOMS_NESTED_ATTRIBUTE(state, payload) {
            state.rooms[payload.roomsIndex][payload.attribute][payload.nested] = payload.value;
        },
        RESET_A_ROOM(state, payload) {
            const room = state.rooms[payload.roomsIndex];
            // Reset footage related values
            room.area = 0;
            room.width.feet = '';
            room.width.inches = '';
            room.length.feet = '';
            room.length.inches = '';
            room.percentOfPrivateSpace = 0;
            room.percentOfTotalSpace = 0;
            // Reset payment related values
            room.payment = 0;
            room.negativeValue = 0;
            room.negativeValues = {};
            room.positiveValue = 0;
            room.positiveValues = {};
            room.privatePayment = 0;
            // Reset other values
            room.eachOccupantsPercentOfPrivateSpace = 0;
            room.occupants = 0;
            room.note = 0;
        },
        RESET_ALL_ROOMS(state) {
            const rooms = state.rooms;
            rooms.map((room) => {
                room.area = 0;
                room.width.feet = '';
                room.width.inches = '';
                room.length.feet = '';
                room.length.inches = '';
                room.percentOfPrivateSpace = 0;
                room.percentOfTotalSpace = 0;
                // Reset payment related values
                room.payment = 0;
                room.negativeValue = 0;
                room.negativeValues = {};
                room.positiveValue = 0;
                room.positiveValues = {};
                room.privatePayment = 0;
                // Reset other values
                room.eachOccupantsPercentOfPrivateSpace = 0;
                room.occupants = 0;
                room.note = 0;
            });
        },
        ADD_TABLE_ERROR(state, errorName) {
            if (!state.currentTableErrors.includes(errorName)) {
                state.currentTableErrors.push(errorName);
            }
        },
        REMOVE_TABLE_ERROR(state, errorName) {
            let indexOfError = state.currentTableErrors.indexOf(errorName);
            if (indexOfError !== -1) {
                state.currentTableErrors.splice(indexOfError, 1);
            }
        }
    }
});
