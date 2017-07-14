<template>
    <div>
        <hr>
    
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="8" v-for="(input, index) in inputs" v-bind:input="input" v-bind:index="index" v-bind:key="input.id">
                <primary-input v-on:inputValidityChanged="inputsChanged" :name="index" v-bind="input"></primary-input>
            </el-col>
        </el-row>
        <!-- <el-row type="flex" justify="center" :gutter="20">
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
                                                </el-row> -->
        <hr>
    </div>
</template>

<script>
import PrimaryInput from './PrimaryInput.vue';

export default {
    props: ['inputs'],

    components: {
        PrimaryInput
    },
    watch: {
        completedInputs: function () {
            const allInputsValid = this.completedInputs.length === this.numberInputs;
            this.$emit('inputsValidnessChanged', allInputsValid);
        }
    },
    methods: {
        inputsChanged(inputName, inputValue, valid) {
            // First update the input object to have the new value from the input component.
            this.inputs[inputName].value = inputValue;
            // Then check to see if the input is valid, and if so add it to our list of valid inputs.
            const inputInCompletedInputs = this.completedInputs.includes(inputName);
            if (valid && !inputInCompletedInputs) {
                this.completedInputs.push(inputName);
            } else if (!valid && inputInCompletedInputs) {
                this.completedInputs.pop(inputName);
            }
        }
    },

    data: function () {
        return {
            numberInputs: Object.keys(this.inputs).length,
            completedInputs: []
        };
    }
};
</script>
