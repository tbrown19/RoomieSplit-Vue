<template>
    <div>
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="8" v-for="(input, index) in inputs" v-bind:input="input" v-bind:index="index" v-bind:key="input.id">
                <updatable-input v-on:inputValueChanged="inputsChanged" :name="index" v-bind="input"></updatable-input>
            </el-col>
        </el-row>
        <hr>
    </div>
</template>

<script>
import UpdatableInput from './UpdatableInput.vue';

export default {
    name: 'Updatable-Inputs',

    props: ['inputs'],

    components: {
        UpdatableInput
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
