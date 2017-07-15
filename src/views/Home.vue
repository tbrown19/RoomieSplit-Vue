<template>
    <div>
        <div id="intro-text" class="has-text-centered">
            <h1 class="title">Calculate how much each person should contribute to the rent.</h1>
            <h1 class="title">Get started by filling out the information below.</h1>
        </div>
<<<<<<< HEAD
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
        mainInputStepComplete(inputsCompleted, inputs) {
            //this.roomData = inputs;
            this.mainInputsCompleted = inputsCompleted;
            this.inputs = inputs;
        },



        proceedToNextStep() {
            this.inputsToHousingInformation();
            this.addConfigurationToDB().then((configId) => {
                this.$router.push({ name: 'calculator', params: { configId: configId } })
            });
        },

        inputsToHousingInformation() {
            let housingInformation = {}
            housingInformation.numRooms = this.inputs.numRooms.value;
            housingInformation.area = this.inputs.area.value;
            housingInformation.rent = this.inputs.rent.value;
            this.housingInformation = housingInformation;
        },

        addConfigurationToDB() {
            //Add the newly created room configuration to the database and then return its unique key
            return new Promise((resolve, reject) => {
                Database.ref('RoomConfigurations').push(this.housingInformation).then((snap) => {
                    if (snap.key.length > 0) {
                        console.log("we stored that config manye." + snap.key)
                        resolve(snap.key);
                    }
                    else {
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
            inputs: {}
        }
    }
}
</script>


<style>
#intro-text {
    margin-bottom: 2rem;
    font-size: 2rem;
}
=======
        <primary-inputs :inputs="inputs" @inputsValidnessChanged="inputsValidnessChanged"></primary-inputs>
        <slide-fade>
            <el-row type="flex" justify="center" v-if="mainInputsCompleted">
                <button id="nextStepButton" @click='proceedToNextStep' class="button is-primary is-large">Next Step</button>
            </el-row>
        </slide-fade>
    
    </div>
</template>

<script>
import PrimaryInputs from '../components/home/PrimaryInputs.vue';
import SlideFade from '../components/transitions/SlideFade.vue';
import { addRoomConfiguration } from '../services/firebase-actions.js';

export default {
    components: {
        PrimaryInputs, SlideFade
    },

    methods: {
        inputsValidnessChanged(currentValidness) {
            this.mainInputsCompleted = currentValidness;
        },

        proceedToNextStep() {
            let roomConfigruation = this.inputsToroomConfigruation(this.inputs);
            console.log(roomConfigruation);
            addRoomConfiguration(roomConfigruation).then((configId) => {
                this.$router.push({ name: 'calculator', params: { configId: configId } });
            });
        },

        inputsToroomConfigruation(inputs) {
            console.log(inputs);
            let roomConfigruation = {
                'numRooms': inputs.rooms.value,
                'area': inputs.area.value,
                'rent': inputs.rent.value
            };
            return roomConfigruation;
        }
    },

    data: function () {
        return {
            inputs: {
                'rooms': {
                    'value': '',
                    'min': 1,
                    'max': 10,
                    'tooltip': 'The total number of rooms.'
                },
                'area': {
                    'value': '',
                    'min': 1,
                    'max': 10000,
                    'tooltip': 'The total area of the entire living space.'
                },
                'rent': {
                    'value': '',
                    'min': 1,
                    'max': 100000,
                    'tooltip': 'The cost of rent.'
                }
            },
            roomConfigruation: {},
            mainInputsCompleted: false
        };
    }
};
</script>

<style lang="scss">

>>>>>>> move-to-webpack
</style>
