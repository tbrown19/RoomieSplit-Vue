<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="6">
                <MainInput v-on:input="userInput" name="rooms" minVal="1" maxVal="10">
                    <div slot="inputDescription">Number Of Rooms</div>
                </MainInput>
            </el-col>
    
            <el-col :span="6" :offset="2">
                <MainInput v-on:input="userInput" name="footage" minVal="1" maxVal="20000">
                    <div slot="inputDescription">Square Footage</div>
                </MainInput>
            </el-col>
    
            <el-col :span="6" :offset="2">
                <MainInput v-on:input="userInput" name="rent" minVal="1" maxVal="10000">
                    <div slot="inputDescription">Rent</div>
                </MainInput>
            </el-col>
    
        </el-row>
    

        <MainInputProgressBar :visible="!showRoomsTable" :inputProgress="inputProgress"></MainInputProgressBar>
    
        <NextButton v-on:click="nextStep()" :visible="mainInputsCompleted && !showRoomsTable"></NextButton>

    
    </div>
</template>

<script>
import MainInput from './main-input.vue';
import MainInputProgressBar from './main-input-progress.vue'
import NextButton from './main-inputs-next.vue'

export default {
    components: {
        MainInput, MainInputProgressBar, NextButton
    },

    watch: {
        inputProgress: function (progress) {
            this.mainInputsCompleted = progress >= 99;
        }
    },

    methods: {
        //Update the input objet, and then update the status bar
        userInput(inputName, inputValue, valid) {
            this.$set(this.inputs[inputName], 'value', inputValue);
            this.$set(this.inputs[inputName], 'valid', valid);
            this.updateInputProgress()
        },

        updateInputProgress() {
            let inputProgress = 0;
            for (const input of Object.keys(this.inputs)) {
                if (this.inputs[input].valid) {
                    inputProgress += 100 / 3;
                }
            }
            this.inputProgress = inputProgress;
        },

        nextStep(){
            this.showRoomsTable = true;
            this.$store.commmit('housingInformation', this.inputs);
            this.$emit('mainInputStepComplete', this.inputs);
        },

        inputsToArrayValues(){
            
        }
    },



    data: function () {
        return {
            inputs: {
                'rooms': {
                    'value': 5,
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
            inputProgress: 0,
            mainInputsCompleted: false,
            showRoomsTable: false
        }
    }
}
</script>


<style>
label {
    font-family: 'Lato', sans-serif;
}
</style>