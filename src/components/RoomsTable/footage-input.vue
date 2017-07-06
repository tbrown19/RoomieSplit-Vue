<template>
    <input @input="checkFootage(currentRow.footage)" v-model.number="currentRow.footage" v-validate="'required'" :class="{'input': true, 
                            'is-danger': errors.has('footage'), 
                            'is-success': !errors.has('footage') && this.currentRow.footage != ''}" type="number" placeholder="0" name="footage">
</template>

<script>
let inputHelpers = require('../../helpers/input-helpers.js')
export default {
    props: ['scope'],

    methods: {
        checkFootage(footageValue) {
            thiscurrentRow.footage = inputHelpers.validateInput(footageValue, 1, 1000);

        },
    },

    watch: {
        //Watch for changes in the current row so we can know if we should disable the current inputs
        currentRow: {
            handler: function (val, oldVal) {
                this.calculateFootage();
            },
            deep: true
        }
    },

    methods: {
        calculateFootage() {
            let lengthFeet = this.currentRow.length.feet;
            let lengthInches = this.currentRow.length.inches;
            let totalLength = lengthFeet + (lengthInches / 12);

            let widthFeet = this.currentRow.width.feet;
            let widthInches = this.currentRow.width.inches;
            let totalWidth = widthFeet + (widthInches / 12);

            let roomFootage = totalLength * totalWidth;

            this.currentRow.footage = parseFloat(roomFootage).toFixed(2);

            let totalFootage = this.$store.state.housingInformation.footage.value;

            let percentageTotal = this.currentRow.footage / totalFootage * 100;
            // if (percentageTotal == Infinity){
            //     percentageTotal = 0;
            // }
            this.currentRow.percentageTotal = parseFloat(percentageTotal).toFixed(2);
        }
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