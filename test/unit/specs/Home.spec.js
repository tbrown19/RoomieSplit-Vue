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
        function updateInputValues(value) {
            const inputs = vm.$el.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = value;
                input.dispatchEvent(new Event('input'));
            });
        }

        it('should render correct contents', () => {
            expect(vm.$el.querySelector('.card div').textContent)
                .to.include('Rooms', 'Area', 'Rent');
            expect(vm.$el.querySelector('.card div').textContent)
                .to.include('Rooms', 'Area', 'Rent');
        });

        it('should allow input', (done) => {
            updateInputValues('1');
            // After events settle.
            Vue.nextTick(() => {
                const inputs = vm.$el.querySelectorAll('input');
                inputs.forEach(input => {
                    expect(input.value).to.equal('1');
                });
                done();
            });
        });

        it('should update the mainInputsCompleted boolean after 3 valid inputs', (done) => {
            updateInputValues('1');
            // After events settle.
            Vue.nextTick(() => {
                const nextButton = vm.$el.querySelector('#nextStepButton');
                expect(nextButton).to.not.equal(null);
                done();
            });
        });

        it('should show an error message on invalid input', (done) => {
            updateInputValues('-1');
            // After events settle.
            Vue.nextTick(() => {
                const errorMessages = vm.$el.querySelectorAll('.input-error');
                // 3 Invalid inputs means we should expect 3 error messages.
                expect(errorMessages.length).to.equal(3);
                done();
            });
        });
    });
});
