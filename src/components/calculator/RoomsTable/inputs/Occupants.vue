<template>
    <input v-if="displayOccupants" class='occupants-input input' @input="checkOccupants(occupants)" v-model.number="occupants" v-validate="'required'" :class="{'is-danger': errors.has('occupants'), 
                        'is-success': !errors.has('occupants') && this.occupants != ''}" type="number" placeholder="0" name="occupants">
</template>

<script>
import { validateInput } from '../../../../utils/helpers/input-helpers.js';
export default {
    props: ['roomsIndex'],

    computed: {
        displayOccupants() {
            return this.occupants > 0;
        },
        occupantsFromStore() {
            return this.$store.getters.occupants(this.roomsIndex);
        }
    },
    watch: {
        occupantsFromStore(newOccupants) {
            this.occupants = newOccupants;
        }
    },
    methods: {
        checkOccupants(occupants) {
            this.occupants = validateInput(occupants, 1, 5, 1);
            this.$emit('occupantsUpdated', this.roomsIndex, this.occupants);
        }
    },

    data: function() {
        return {
            occupants: this.$store.getters.occupants(this.roomsIndex)
        };
    }
};
</script>

<style>
.occupants-input {
    max-width: 3.5rem;
}
</style>
