<template>
    <div>
        <hr>
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="8">
                <MainInput v-on:input="userInput" name="numRooms" minVal="1" maxVal="10">
                    <div slot="inputDescription">Rooms</div>
                    <div slot="toolTip">The total number of rooms.</div>
                </MainInput>
            </el-col>
    
            <el-col :span="8">
                <MainInput v-on:input="userInput" name="area" minVal="1" maxVal="20000">
                    <div slot="inputDescription">Area</div>
                    <div slot="toolTip">The total area of the entire living space.</div>
                </MainInput>
            </el-col>
    
            <el-col :span="8">
                <MainInput v-on:input="userInput" name="rent" minVal="1" maxVal="50000">
                    <div slot="inputDescription">Rent</div>
                    <div slot="toolTip">The cost of rent.</div>
                </MainInput>
            </el-col>
    
        </el-row>
        
        <hr>

        <!--<MainInputProgressBar :visible="!showRoomsTable" :inputProgress="inputProgress"></MainInputProgressBar>-->
    

    
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
                'numRooms': {
                    'value': 0,
                    'valid': false
                },

                'area': {
                    'value': 0,
                    'valid': false
                },

                'rent': {
                    'value': 0,
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