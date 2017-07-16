<template>
    <input class='occupants-input' @input="checkOccupants(room.occupants)" v-model.number="room.occupants" v-validate="'required'" :class="{'input': true, 
                                'is-danger': errors.has('occupants'), 
                                'is-success': !errors.has('occupants') && this.room.occupants != ''}" type="number" placeholder="0" name="occupants">
</template>

<script>
import { validateInput } from '../../../../utils/helpers/input-helpers.js';
export default {
    props: ['row'],

    methods: {
        checkOccupants(occupants) {
            this.room.occupants = validateInput(occupants, 1, 5, '');
            this.$emit('occupantsUpdated', this.room);
        }
    },

    data: function () {
        return {
            room: this.row
        };
    }
};
</script>

<style>
.occupants-input {
    max-width: 3.5rem;
}
</style>
