import Vue from 'vue';
import Home from '@/views/Home';

describe('Home.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Home);
        const vm = new Constructor().$mount();
        Vue.nextTick(() => {
            expect(vm.$el.querySelector('h1').textContent)
            .to.include('Calculate how much each person should contribute to the rent.');
            // Since we're doing this asynchronously, we need to call done() to tell Mocha that we've finished the test.
        });
    });
});
