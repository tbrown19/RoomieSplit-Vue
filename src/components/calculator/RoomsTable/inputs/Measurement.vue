<template>
    <div>
    
        <el-form :inline="true" :model="measurement">
            <el-form-item class="measurement-input">
                <input @input="checkFeet(measurement.feet)" v-model.number="measurement.feet" v-validate="'required|between:1,99'" :class="{'input': true, 'is-danger': errors.has('feet'), 'is-success': !errors.has('feet') && this.measurement.feet != ''}" type="number" placeholder="ft" name="feet">
            </el-form-item>
    
            <el-form-item class="measurement-input">
                <input @input="checkInches(measurement.inches)" v-model.number="measurement.inches" v-validate="'between:0,12'" :class="{'input': true, 'is-danger': errors.has('inches'), 'is-success': !errors.has('inches') && this.measurement.inches != ''}" type="number" placeholder="in" name="inches">
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// let inputHelpers = require('../../helpers/input-helpers.js');
export default {
    props: ['scope', 'type'],

    methods: {
        checkFeet(feetValue) {
            // this.measurement.feet = inputHelpers.validateInput(feetValue, 0, 99, '');
            this.$emit('areaUpdated', this.currentRoom);
        },

        checkInches(inchesValue) {
            // this.measurement.inches = inputHelpers.validateInput(inchesValue, 0, 11, '');
            this.$emit('areaUpdated', this.currentRoom);
        }
    },

    data: function () {
        // Get the current row, and then get the current measurement type either length or width.
        let currentRoom = this.scope.row;
        // let measurement = currentRoom[this.type];
        return {
            currentRoom,
            measurement: currentRoom[this.type]
        };
    }
};
</script>

<style scoped>
.measurement-input {
    padding-top: 1rem;
    max-width: 3.5rem;
}
</style>
