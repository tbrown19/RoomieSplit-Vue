<template>
    <div>
        <hr>
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="8" v-for="(input, index) in inputs" v-bind:input="input" v-bind:index="index" v-bind:key="input.id">
                <primary-input v-on:inputValueChanged="inputsChanged" :name="index" v-bind="input"></primary-input>
            </el-col>
        </el-row>
        <hr>
    </div>
</template>

<script>
import PrimaryInput from './PrimaryInput.vue';

export default {
    name: 'Primary-Inputs',

    props: ['inputs'],

    components: {
        PrimaryInput
    },

    methods: {
        inputsChanged(inputName, inputValue, valid) {
            // First update the input object to have the new value from the input component.
            this.inputs[inputName].value = inputValue;
            // Then check to see if the input is valid, and if so add it to our list of valid inputs.
            const inputInCompletedInputs = this.completedInputs.has(inputName);
            if (valid && !inputInCompletedInputs) {
                this.completedInputs.add(inputName);
            } else if (!valid && inputInCompletedInputs) {
                this.completedInputs.delete(inputName);
            }
            this.checkAllInputsCompletion();
        },

        checkAllInputsCompletion() {
            const allInputsValid = this.completedInputs.size === this.numberInputs;
            this.$emit('inputsValidnessChanged', allInputsValid);
        }
    },

    data: function () {
        return {
            numberInputs: Object.keys(this.inputs).length,
            completedInputs: new Set()
        };
    }
};
</script>
