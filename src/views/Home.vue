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
import { Database } from '../firebase.js';

export default {

    components: {
        MainInputs, RoomsTable, NextButton
    },

    methods: {
        mainInputStepComplete(inputsCompleted, roomConfiguration) {
            //this.roomData = inputs;
            this.mainInputsCompleted = inputsCompleted;
            this.roomConfiguration = roomConfiguration;
        },

        proceedToNextStep() {
            console.log(this.$store);
            this.$store.commit('addHousingInformation', this.roomConfiguration);
            this.addConfigurationToDB().then((configId) => {
                this.$router.push({ name: 'calculator', params: { configId: configId } })
            });
        },

        addConfigurationToDB() {
            //Add the newly created room configuration to the database and then return its unique key
            return new Promise((resolve, reject) => {
                Database.ref('RoomConfigurations').push(this.roomConfiguration).then((snap) => {
                    if  (snap.key.length > 0){
                        console.log("we stored that config manye." + snap.key)
                        resolve(snap.key);
                    }
                    else{
                        reject("Failed to store room configuration in database.");
                    }
                });
            });
            
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
