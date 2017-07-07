<template>
    <input class="footage-input" @input="checkFootage(currentRow.footage)" v-model.number="currentRow.footage" v-validate="'required'" :class="{'input': true, 
                            'is-danger': errors.has('footage'), 
                            'is-success': !errors.has('footage') && this.currentRow.footage != ''}" type="number" placeholder="0" name="footage">
</template>

<script>
let inputHelpers = require('../../helpers/input-helpers.js');

export default {
    props: ['scope'],

    methods: {
        checkFootage(footageValue) {
            this.currentRow.footage = inputHelpers.validateInput(footageValue, 0, 1000);
            this.$emit("footageUpdated", "footage", this.currentRow);
        },
    },

    data: function () {
        let currentRow = this.scope.row;
        return {
            currentRow,
            disabled: false
        }
    }
}
</script>

<style>
    .footage-input{
        width: 8rem;
    }
</style>
