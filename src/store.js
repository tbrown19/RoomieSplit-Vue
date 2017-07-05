import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        housingInformation: {
            'rooms': {
                'value': 2,
                'valid': false
            },

            'footage': {
                'value': 5000,
                'valid': false
            },

            'rent': {
                'value': 500,
                'valid': false
            }

        },
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },

    getters: {

    }
});