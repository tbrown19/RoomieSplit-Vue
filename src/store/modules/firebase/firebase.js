// initial state
// import * as getters from './getters';
import * as actions from './actions';

const state = {
    loadingFromDatabase: false,
    firebaseActionErrors: null,
    savingRoomsToDatabase: false
};

const getters = {
    isLoadingFromDatabase: state => state.loadingFromDatabase,
    getFirebaseActionErrors: state => state.firebaseActionErrors,
    isSavingRoomsToDatabase: state => state.savingRoomsToDatabase
};

const mutations = {
    SET_LOADING_FROM_DATABASE(state, isLoading) {
        state.loadingFromDatabase = isLoading;
    },
    SET_FIREBASE_ERROR(state, error) {
        state.firebaseActionErrors = error;
    },
    SET_SAVING_ROOMS_TO_DATABASE(state, isSaving) {
        state.savingRoomsToDatabase = isSaving;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
