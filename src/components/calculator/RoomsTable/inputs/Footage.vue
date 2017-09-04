<template>
    <div>

        <div v-if="editing">
            <input class="area-input" @blur="editing = false" @input="checkArea(editingArea)" v-model.number="editingArea" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('area'), 'is-success': !errors.has('area') && this.editingArea != '' && this.editingArea != 0}" type="number" placeholder="0" name="area" value=4>
        </div>

        <div v-else>
            <input @click="editing = true" class="area-input displayOnlyInput" v-model.number="roundedArea" :class="{'input': true, 'is-valid': !errors.has('area') && this.currentArea != ''}" type="number" placeholder="0" name="area">
        </div>

    </div>
</template>

<script>
// let inputHelpers = require('../../helpers/input-helpers.js');
import { validateInput } from '../../../../utils/helpers/input-helpers.js';

export default {
    props: ['roomsIndex'],

    computed: {
        roundedArea: function() {
            if (this.$store.getters.rooms[this.roomsIndex].area === '' || this.$store.getters.rooms[this.roomsIndex].area === 0.00) return 0;
            return parseFloat(this.$store.getters.rooms[this.roomsIndex].area).toFixed(2);
        },
        currentArea() {
            return this.$store.getters.rooms[this.roomsIndex].area;
        }
        // editingArea() {
        //     return this.$store.getters.rooms[this.roomsIndex].area;
        // }
    },

    watch: {
        currentArea() {
            console.log('the current area changed.');
            this.editingArea = this.$store.getters.rooms[this.roomsIndex].area;
        }
    },
    methods: {
        checkArea(area) {
            this.editingArea = validateInput(area, 0, 999, 0);
            this.$emit('areaUpdated', this.roomsIndex, this.editingArea);
        }
    },

    data: function() {
        return {
            editing: false,
            editingArea: this.$store.getters.rooms[this.roomsIndex].area
        };
    }
};
</script>

<style>
.is-valid {
    border-radius: 3px;
    background-color: white;
    border: 1px solid #00d1b2;
}

.area-input {
    width: 8rem;
}


.displayOnlyInput::-webkit-outer-spin-button,
.displayOnlyInput::-webkit-inner-spin-button {
    /* This gets rid of the little arrows on the number input when its the display only one since they don't work anyways*/
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
