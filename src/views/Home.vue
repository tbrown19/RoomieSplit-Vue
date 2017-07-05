<template>
    <MainInputs v-on:mainInputStepComplete="mainInputStepComplete"></MainInputs>
</template>


<script>
import MainInputs from '../components/main-inputs.vue'
import RoomsTable from '../components/RoomsTable/table.vue'

export default {

    components: {
        MainInputs, RoomsTable
    },

    methods: {
        mainInputStepComplete(inputs){
            //this.roomData = inputs;
            console.log("inputs complete " + inputs);
        }
    },


    data: function () {
        return {
            showTitleText: true,
            showRoomsTable: false,
            roomData: {}
        }
    }
}
</script>


<style>

</style>
