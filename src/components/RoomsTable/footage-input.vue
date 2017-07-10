<template>
    <input class="area-input" @input="checkArea(currentRow.area)" v-model.number="roundedArea" v-validate="'required'" :class="{'input': true, 
                            'is-danger': errors.has('area'), 
                            'is-success': !errors.has('area') && this.currentRow.area != ''}" type="number" placeholder="0" name="area">
</template>

<script>
let inputHelpers = require('../../helpers/input-helpers.js');

export default {
    props: ['scope'],


    computed: {
        roundedArea: function(){
            return parseFloat(this.currentRow.area).toFixed(2)
        }
    },

    methods: {
        checkArea(areaValue) {
            this.currentRow.area = inputHelpers.validateInput(areaValue, 0, 20000);
            this.$emit("areaUpdated", "area", this.currentRow);
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
    .area-input{
        width: 8rem;
    }
</style>
