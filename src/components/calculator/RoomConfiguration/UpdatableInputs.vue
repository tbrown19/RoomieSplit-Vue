<template>
    <div>
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="8" v-for="(input, index) in inputs" v-bind:input="input" v-bind:index="index" v-bind:key="input.id">
                <updatable-input v-on:saveInput="saveInput" :value="roomConfiguration[index]" v-bind="input"></updatable-input>
            </el-col>
        </el-row>
        <hr>
    </div>
</template>

<script>
import UpdatableInput from './UpdatableInput.vue';

export default {
    name: 'Updatable-Inputs',

    props: ['inputs', 'roomConfiguration'],

    components: {
        UpdatableInput
    },

    methods: {
        saveInput(inputName, inputValue) {
            this.$emit('saveInput', inputName, inputValue);
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
