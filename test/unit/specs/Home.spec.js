import Vue from 'vue';
import Home from '@/views/Home';

describe('Home.vue', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor().$mount();

    it('sets the correct default data', () => {
        expect(Home.data).to.be.a('function');
        const defaultData = Home.data();
        expect(defaultData.mainInputsCompleted).to.be.false;
    });

    describe('Header Text', () => {
        it('should render correct contents', () => {
            expect(vm.$el.querySelector('h1').textContent)
                .to.include('Calculate how much each person should contribute to the rent.',
                    'Get started by filling out the information below.'
                );
        });
    });

    describe('Primary Inputs', () => {
        it('should render correct contents', () => {
            expect(vm.$el.querySelector('.card div').textContent)
                .to.include('Rooms', 'Area', 'Rent');
            expect(vm.$el.querySelector('.card div').textContent)
                .to.include('Rooms', 'Area', 'Rent');
            // expect(vm.$el.querySelector('.card'))
            //     .to.include('Calculate how much each person should contribute to the rent.',
            //         'Get started by filling out the information below.'
            //     );
        });
    });
});
