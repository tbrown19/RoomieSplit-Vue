<template>
    <updatable-inputs :inputs="inputs" @inputsValidnessChanged="inputsValidnessChanged"></updatable-inputs>
</template>


<script>
import UpdatableInputs from '../components/calculator/RoomConfiguration/UpdatableInputs.vue';
import RoomsTable from '../components/calculator/RoomsTable/Table.vue';

export default {

    components: {
        UpdatableInputs, RoomsTable
    },

    methods: {
        inputsValidnessChanged(currentValidness) {
            this.mainInputsCompleted = currentValidness;
        }
    },

    data: function () {
        return {
            inputs: {
                'rooms': {
                    'value': 0,
                    'min': 1,
                    'max': 10,
                    'tooltip': 'The total number of rooms.'
                },
                'area': {
                    'value': 0,
                    'min': 1,
                    'max': 10000,
                    'tooltip': 'The total area of the entire living space.'
                },
                'rent': {
                    'value': 0,
                    'min': 1,
                    'max': 100000,
                    'tooltip': 'The cost of rent.'
                }
            }
        };
    }
};
</script>

<style lang="scss">

</style>
