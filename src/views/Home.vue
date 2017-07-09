<template>
    <div>
        <MainInputs @valueInputed="mainInputStepComplete"></MainInputs>
        <NextButton @click="proceedToNextStep" :visible="mainInputsCompleted"></NextButton>
    </div>
</template>


<script>
import MainInputs from '../components/main-inputs.vue';
import RoomsTable from '../components/RoomsTable/table.vue';
import NextButton from '../components/main-inputs-next.vue';
import { RoomConfigurations } from '../firebase.js';

export default {

    components: {
        MainInputs, RoomsTable, NextButton
    },

    methods: {
        mainInputStepComplete(inputsCompleted, roomConfiguration) {
            //this.roomData = inputs;
            this.mainInputsCompleted = inputsCompleted;
            this.roomConfiguration = roomConfiguration;
            //this.$store.commmit('housingInformation', this.inputs);
        },

        proceedToNextStep() {
            console.log('lets do the next step.');
            this.testAddToDB();
        },

        addConfigToDB() {
            //Add the newly created room configuration to the database and then return its unique key
            RoomConfigurations.push(this.roomConfiguration).then((snap) => {
                return snap.key;
            })
        },

    },


    data: function () {
        return {
            showTitleText: true,
            showRoomsTable: false,
            mainInputsCompleted: false,
            roomConfiguration: {}
        }
    }
}
</script>


<style>

</style>
