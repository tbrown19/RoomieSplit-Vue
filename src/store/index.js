import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
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
        commonSpaceValueModifier: 0,
        rooms: [],
        currentTableErrors: []
    },

    getters,
    actions,
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
            console.log(payload.roomsIndex);
            console.log(state.rooms[payload.roomsIndex]);
            // console.log(payload);
            state.rooms[payload.roomsIndex][payload.attribute] = payload.value;
            console.log(state.rooms[payload.roomsIndex]);
            // console.log(payload.attribute + ': ' + state.rooms[payload.roomsIndex][payload.attribute]);
        },
        UPDATE_A_ROOMS_NESTED_ATTRIBUTE(state, payload) {
            // console.log(payload);
            state.rooms[payload.roomsIndex][payload.attribute][payload.nested] = payload.value;
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
