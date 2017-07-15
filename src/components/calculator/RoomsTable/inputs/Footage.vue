<template>
    <div>
    
        <div v-if="editing">
            <input class="area-input" @blur="editing = false" @input="checkArea(currentArea)" v-model.number="currentArea" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('area'), 'is-success': !errors.has('area') && this.currentArea != '' && this.currentArea != 0}" type="number" placeholder="0" name="area" value=4>
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
    props: ['room', 'area'],
    watch: {
        // If the area changes from the parent, then update the current area to be the new one.
        area() {
            this.currentArea = this.area;
        }
    },

    computed: {
        roundedArea: function () {
            if (this.currentArea === '' || this.currentArea === 0.00) return 0;
            return parseFloat(this.currentArea).toFixed(2);
        }
    },

    methods: {
        checkArea(area) {
            this.currentArea = validateInput(area, 0, 999, 0);
            this.$emit('areaUpdated', this.room, this.currentArea);
        }
    },

    data: function () {
        return {
            editing: false,
            currentArea: this.area
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
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
