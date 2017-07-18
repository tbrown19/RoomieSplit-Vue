<template>
    <input v-if="displayOccupants" class='occupants-input' @input="checkOccupants(occupants)" v-model.number="occupants" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('occupants'), 'is-success': !errors.has('occupants') && this.occupants != ''}" type="number" placeholder="0" name="occupants">
</template>

<script>
import { validateInput } from '../../../../utils/helpers/input-helpers.js';
export default {
    props: ['index'],

    computed: {
        displayOccupants() {
            return this.$store.getters.roomArea(this.index) > 0;
        }
    },
    methods: {
        checkOccupants(occupants) {
            this.occupants = validateInput(occupants, 1, 5, '');
            this.$emit('occupantsUpdated', this.index, this.occupants);
        }
    },

    data: function () {
        return {
            occupants: this.$store.getters.occupants(this.index)
        };
    }
};
</script>

<style>
.occupants-input {
    max-width: 3.5rem;
}
</style>
