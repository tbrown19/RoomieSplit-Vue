import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        housingInformation: {},
    },
    getters: {
        housingInformation: state => {
            return state.housingInformation;
        }
    },

    

    mutations: {
        addHousingInformation(state, housingInformation) {
            console.log(housingInformation);
            state.housingInformation = housingInformation;
        }
    },

    getters: {

    }
});