<template>
    <div>
        <div v-if="editing">
            <input class="area-input" @blur="editing =! editing" @input="checkArea(currentArea)" v-model.number="currentArea" v-validate="'required'" :class="{'input': true, 
                                            'is-danger': errors.has('area'), 
                                            'is-success': !errors.has('area') && this.area != ''}" type="number" placeholder="0" name="area" value=4>
        </div>
        <div v-else @click="editing = !editing">
            <span class="tag is-success is-large">{{roundedArea}}</span>
        </div>
    </div>
</template>

<script>
// let inputHelpers = require('../../helpers/input-helpers.js');
import { validateInput } from '../../../../utils/helpers/input-helpers.js';
export default {
    props: ['area'],

    computed: {
        roundedArea: function () {
            if (this.currentArea === '') return 0;
            return parseFloat(this.currentArea).toFixed(2);
        }
    },

    methods: {
        checkArea(area) {
            console.log(this.roundedArea);
            this.currentArea = validateInput(area, 0, 999, 0);
            this.$emit('areaUpdated', this.currentArea);
        }
    },

    data: function () {
        console.log(this.area);
        return {
            editing: false,
            currentArea: this.area
        };
    }
};
</script>

<style>
.area-input {
    width: 8rem;
}
</style>
