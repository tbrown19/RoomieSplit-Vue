import Vue from 'vue';
import Vuex from 'vuex';
import {
    getRoomConfiguration
} from '../services/firebase-actions.js';
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    state: {
        numRooms: 0,
        area: 0,
        rent: 0,
        rooms: [],
        loadingFromDatabase: false,
        firebaseActionErrors: null,
        currentTableErrors: []
    },

    getters: {
        roomConfiguration: state => {
            return {
                'numRooms': state.numRooms,
                'area': state.area,
                'rent': state.rent,
                'rooms': state.rooms
            };
        },
        getRooms: state => {
            return state.rooms;
        },
        getRoomByNumber: (state, getters) => (roomNumber) => {
            return state.getters.getRooms[roomNumber];
        },
        getCurrentTableErrors: state => {
            return state.currentTableErrors;
        },
        isLoadingFromDatabase: state => {
            return state.loadingFromDatabase;
        },
        getFirebaseActionErrors: state => {
            return state.firebaseActionErrors;
        }
    },

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
        ADD_TABLE_ERROR(state, errorName) {
            if (!state.currentTableErrors.includes(errorName)) {
                state.currentTableErrors.push(errorName);
            }
        },
        REMOVE_TABLE_ERROR(state, errorName) {
            let indexOfError = state.currentTableErrors.indexOf(errorName);
            if (indexOfError !== -1) {
                console.log(indexOfError);
                state.currentTableErrors.splice(indexOfError, 1);
            }
        },
        SET_LOADING_FROM_DATABASE(state, isLoading) {
            state.loadingFromDatabase = isLoading;
        },
        SET_FIREBASE_ERROR(state, error) {
            state.firebaseActionErrors = error;
        }
    },
    actions: {
        loadRoomConfiguration(context, routeId) {
            context.commit('SET_LOADING_FROM_DATABASE', true);
            getRoomConfiguration(routeId).then((roomConfiguration) => {
                context.commit('SET_LOADING_FROM_DATABASE', false);
                // this.roomConfiguration = roomConfiguration;
                context.commit('SET_ROOM_CONFIGURATION', roomConfiguration);
            }, (error) => {
                context.commit('SET_LOADING_FROM_DATABASE', false);
                context.commit('SET_FIREBASE_ERROR', error);
            });
        }
    }
});
