<template>
    <div>
        <el-form :inline="true">
            
            <el-form-item class="measurement-input">
                <input 
                class="input"
                @input="checkFeet(currentMeasurement.feet)" v-model.number="currentMeasurement.feet" 
                v-validate="'required|between:1,99'" 
                :class="{'is-danger': feetHasErrors, 
                         'is-success': !feetHasErrors && currentMeasurement.feet != ''}" 
                type="number" 
                placeholder="ft" 
                :name="'feet' + roomsIndex.toString()">
            </el-form-item>

            <el-form-item class="measurement-input">
                <input
                class="input"
                @input="checkInches(currentMeasurement.inches)" v-model.number="currentMeasurement.inches" 
                v-validate="'between:0,12'" 
                :class="{'is-danger': errors.has('inches'), 
                    'is-success': !errors.has('inches') && this.currentMeasurement.inches != ''}" 
                type="number" 
                placeholder="in" 
                :name="'inches' + roomsIndex.toString()">
            </el-form-item>
            
        </el-form>
    </div>
</template>

<script>
import { validateInput } from '../../../../utils/helpers/input-helpers.js';
export default {
    props: ['roomsIndex', 'type'],

    computed: {
        feetHasErrors() {
            if (this.errorsCleared) {
                this.errorsCleared = false;
                return false;
            }
            return this.errors.has(`feet${this.roomsIndex}`);
        },

        measurementFromStore() {
            return this.$store.getters.rooms[this.roomsIndex][this.type];
        }
    },

    watch: {
        measurementFromStore: {
            handler: function(newMeasurement) {
                this.currentMeasurement = {...newMeasurement};
                this.errorsCleared = true;
            },
            deep: true
        }
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
        // Creates a copy of the measurement values so that we are not directly editing the store.
        const initalMeasurement = {...this.$store.getters.rooms[this.roomsIndex][this.type]};
        // Get the current row, and then get the current measurement type either length or width.
        return {
            currentMeasurement: initalMeasurement,
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
