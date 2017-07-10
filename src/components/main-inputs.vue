<template>
    <div>
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="8">
                <MainInput v-on:input="userInput" name="rooms" minVal="1" maxVal="10">
                    <div slot="inputDescription">Rooms</div>
                </MainInput>
            </el-col>
    
            <el-col :span="8">
                <MainInput v-on:input="userInput" name="footage" minVal="1" maxVal="20000">
                    <div slot="inputDescription">Area</div>
                </MainInput>
            </el-col>
    
            <el-col :span="8">
                <MainInput v-on:input="userInput" name="rent" minVal="1" maxVal="50000">
                    <div slot="inputDescription">Rent</div>
                </MainInput>
            </el-col>
    
        </el-row>
    

        <MainInputProgressBar :visible="!showRoomsTable" :inputProgress="inputProgress"></MainInputProgressBar>
    

    
    </div>
</template>

<script>
import MainInput from './main-input.vue';
import MainInputProgressBar from './main-input-progress.vue'

export default {
    components: {
        MainInput, MainInputProgressBar
    },

    watch: {
        inputProgress: function (progress) {
            //If theyve completed all the inputs (33+33+33 is about 99.. so we can't quite check 100.) then emit an action, true means all are complete
            if (progress>99){
                this.$emit('valueInputed', true, this.inputs);
            }
            else{
                this.$emit('valueInputed', false, this.inputs);
            }
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
            //For each input if its a valid we add a third to the progress bar
            for (const input of Object.keys(this.inputs)) {
                if (this.inputs[input].valid) {
                    inputProgress += 100 / 3;
                }
            }
            this.inputProgress = inputProgress;
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