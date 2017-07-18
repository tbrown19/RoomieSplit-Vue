import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import room from './modules/room';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    modules: {
        room
    },
    state: {
        numRooms: 0,
        area: 0,
        rent: 0,
        rooms: [],
        loadingFromDatabase: false,
        firebaseActionErrors: null,
        currentTableErrors: [],
        savingRoomsToDatabase: false
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
        SET_ROOMS(state, rooms) {
            state.rooms = rooms;
        },
        SET_ROOM_CONFIGURATION(state, roomConfiguration) {
            state.numRooms = roomConfiguration.numRooms;
            state.area = roomConfiguration.area;
            state.rent = roomConfiguration.rent;
            state.rooms = roomConfiguration.rooms;
        },
        UPDATE_A_ROOM(state, payload) {
            state.rooms[payload.roomsIndex] = payload.value;
        },
        UPDATE_A_ROOMS_ATTRIBUTE(state, payload) {
            // console.log(payload);
            state.rooms[payload.roomsIndex][payload.attribute] = payload.value;
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
        },
        SET_LOADING_FROM_DATABASE(state, isLoading) {
            state.loadingFromDatabase = isLoading;
        },
        SET_FIREBASE_ERROR(state, error) {
            state.firebaseActionErrors = error;
        },
        SET_SAVING_ROOMS_TO_DATABASE(state, isSaving) {
            state.savingRoomsToDatabase = isSaving;
        }
    }
});
