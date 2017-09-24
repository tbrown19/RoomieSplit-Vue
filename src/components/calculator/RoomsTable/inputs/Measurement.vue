<template>
    <div>
        <el-form :inline="true">
            <el-form-item class="measurement-input">
                <input 
                class = 'input'
                @input="checkFeet(currentMeasurement.feet)" v-model.number="currentMeasurement.feet" 
                v-validate="'required|between:1,99'" 
                :class="{'is-danger': feetHasErrors, 'is-success': !feetHasErrors && currentMeasurement.feet != ''}" type="number" placeholder="ft" :name="'feet' + roomsIndex.toString()">
            </el-form-item>

            <el-form-item class="measurement-input">
                <input @input="checkInches(currentMeasurement.inches)" v-model.number="currentMeasurement.inches" v-validate="'between:0,12'" :class="{'input': true, 'is-danger': errors.has('inches'), 'is-success': !errors.has('inches') && this.currentMeasurement.inches != ''}" type="number" placeholder="in" :name="'inches' + roomsIndex.toString()">
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { validateInput } from '../../../../utils/helpers/input-helpers.js';
// import { EventBus } from '../../../../utils/event-bus.js';
export default {
    props: ['roomsIndex', 'measurement', 'type'],

    computed: {
        feetHasErrors() {
            if (this.errorsCleared) {
                this.errorsCleared = false;
                return false;
            }
            return this.errors.has(`feet${this.roomsIndex}`);
        },
        measurementFromStore() {
            return this.$store.getters.rooms[this.roomsIndex][this.type].feet;
        }
    },

    watch: {
        measurementFromStore() {
            console.log('the measurement changed in the store.');
            this.currentMeasurement = {...this.$store.getters.rooms[this.roomsIndex][this.type]};
            this.errorsCleared = true;
        }
    },

    created() {
        console.log(this.measurementFromStore);
        // // If the user updated the area manually then it will clear all these inputs.
        // // This bus watches for that so that it can remove the errors that result from the inputs being cleared.
        // EventBus.$on('areaUpdatedManually', roomNumber => {
        //     // We set the errors cleared field to true if the bus event room number matches the current room number.
        //     if (this.roomsIndex + 1 === roomNumber) {
        //         this.errorsCleared = true;
        //     }
        // });

        // EventBus.$on('measurementsCleared', () => {
        //     // Update the measurement so it is matching the new currently cleared measurement and then get rid of the errors.
        //     this.currentMeasurement = this.currentRoom[this.type];
        //     this.errorsCleared = true;
        // });
    },

    methods: {
        checkFeet(feetValue) {
            this.currentMeasurement.feet = validateInput(feetValue, 0, 99, '');
            this.$emit('measurementUpdated', this.roomsIndex, this.type, 'Feet', this.currentMeasurement.feet);
        },

        checkInches(inchesValue) {
            this.currentMeasurement.inches = validateInput(inchesValue, 0, 11, '');
            this.$emit('measurementUpdated', this.roomsIndex, this.type, 'Inches', this.currentMeasurement.inches);
        }
    },

    data: function() {
        // Get the current row, and then get the current measurement type either length or width.
        return {
            currentMeasurement: { ...this.measurement }, // creates a copy of the measurement values so that we are not directly editing the store.
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
