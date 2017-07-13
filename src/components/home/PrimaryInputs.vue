<template>
    <div>
        <hr>
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="8">
                <primary-input v-on:input="userInput" name="rooms" minVal="1" maxVal="10">
                    <div slot="inputDescription">Rooms</div>
                    <div slot="toolTip">The total number of rooms.</div>
                </primary-input>
            </el-col>
    
            <el-col :span="8">
                <primary-input v-on:input="userInput" name="area" minVal="1" maxVal="20000">
                    <div slot="inputDescription">Area</div>
                    <div slot="toolTip">The total area of the entire living space.</div>
                </primary-input>
            </el-col>
    
            <el-col :span="8">
                <primary-input v-on:input="userInput" name="rent" minVal="1" maxVal="50000">
                    <div slot="inputDescription">Rent</div>
                    <div slot="toolTip">The cost of rent.</div>
                </primary-input>
            </el-col>
        </el-row>
        <hr>
    </div>
</template>

<script>
import PrimaryInput from './PrimaryInput.vue';

export default {
    components: {
        PrimaryInput
    },

    methods: {
        // Update the input objet, and then update the status bar
        userInput(inputName, inputValue, valid) {
            this.$set(this.inputs[inputName], 'value', inputValue);
            this.$set(this.inputs[inputName], 'valid', valid);
            this.checkForCompletedInputs();
        },

        checkForCompletedInputs() {
            let completedInputs = 0;
            for (const input of Object.keys(this.inputs)) {
                if (this.inputs[input].valid) {
                    completedInputs += 1;
                }
            }
            if (completedInputs === 3) {
                this.$emit('inputEntered', this.inputs, true);
            } else {
                this.$emit('inputEntered', this.inputs, false);
            }
        }
    },

    data: function () {
        return {
            inputs: {
                'rooms': {
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
            mainInputsCompleted: false
        };
    }
};
</script>


<style>
label {
    font-family: 'Lato', sans-serif;
}
</style>
