<template>
    <div>
        <el-form :inline="true" :model="measurement">
            <el-form-item class="measurement-input">
                <input @input="checkFeet(measurement.feet)" v-model.number="measurement.feet" v-validate="'required|between:1,99'" :class="{'input': true, 'is-danger': feetHasErrors, 'is-success': !errors.has('feet') && this.measurement.feet != ''}" type="number" placeholder="ft" :name="'feet' + scope.row.roomNumber.toString()">
            </el-form-item>
    
            <el-form-item class="measurement-input">
                <input @input="checkInches(measurement.inches)" v-model.number="measurement.inches" v-validate="'between:0,12'" :class="{'input': true, 'is-danger': errors.has('inches'), 'is-success': !errors.has('inches') && this.measurement.inches != ''}" type="number" placeholder="in" name="inches2">
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { validateInput } from '../../../../utils/helpers/input-helpers.js';
import { EventBus } from '../../../../utils/event-bus.js';

export default {
    props: ['row', 'type'],

    created() {
        // If the user updated the area manually then it will clear all these inputs.
        // This bus watches for that so that it can remove the errors that result from the inputs being cleared.
        EventBus.$on('areaUpdatedManually', roomNumber => {
            // We set the errors cleared field to true if the bus event room number matches the current room number.
            if (this.currentRoom.roomNumber === roomNumber) {
                this.errorsCleared = true;
            }
        });
    },
    computed: {
        feetHasErrors() {
            if (this.errorsCleared) {
                this.errorsCleared = false;
                return false;
            }
            return this.errors.has(`feet${this.scope.row.roomNumber}`);
        }
    },
    methods: {
        checkFeet(feetValue) {
            this.measurement.feet = validateInput(feetValue, 0, 99, '');
            this.$emit('measurementUpdated', this.currentRoom);
        },

        checkInches(inchesValue) {
            this.measurement.inches = validateInput(inchesValue, 0, 11, '');
            this.$emit('measurementUpdated', this.currentRoom);
        }
    },

    data: function () {
        // Get the current row, and then get the current measurement type either length or width.
        let currentRoom = this.scope.row;
        return {
            currentRoom,
            measurement: currentRoom[this.type],
            errorsCleared: false
        };
    }
};
</script>

<style scoped>
.measurement-input {
    padding-top: 1rem;
    max-width: 3.5rem;
    margin-bottom: 0;
}
</style>
