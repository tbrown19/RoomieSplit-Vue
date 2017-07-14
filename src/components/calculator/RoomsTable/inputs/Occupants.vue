<template>
    <input class='occupants-input' @input="checkOccupants(currentRow.occupants)" v-model.number="currentRow.occupants" v-validate="'required'" :class="{'input': true, 
                                'is-danger': errors.has('occupants'), 
                                'is-success': !errors.has('occupants') && this.currentRow.occupants != ''}" type="number" placeholder="0" name="occupants">
</template>

<script>
import { validateInput } from '../../../../utils/helpers/input-helpers.js';
export default {
    props: ['scope'],

    methods: {
        checkOccupants(occupants) {
            this.currentRow.occupants = validateInput(occupants, 1, 5, 1);
            this.$emit('occupantsUpdated', this.currentRow);
        }
    },

    data: function () {
        let currentRow = this.scope.row;
        return {
            currentRow
        };
    }
};
</script>

<style>
.occupants-input {
    max-width: 3.5rem;
}
</style>
