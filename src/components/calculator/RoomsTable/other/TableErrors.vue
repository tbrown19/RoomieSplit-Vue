<template>
    <slide-fade-slow>
        {{currentErrors}}
        <div class="table-errors" v-if="currentErrors.length > 0">
            <div class="notification is-danger" v-for="tableError in currentErrors" :key="tableError">
                <h2 class="is-title">{{ tableError }}</h2>
            </div>
            <hr>
        </div>
    </slide-fade-slow>
</template>

<script>
import SlideFadeSlow from '../../../transitions/SlideFadeSlow.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'table-errors',

    props: ['tableErrors'],

    components: {
        SlideFadeSlow
    },

    computed: {
        ...mapGetters({
            currentErrors: 'getCurrentTableErrors'
        })
    },
    watch: {
        tableErrors: function () {
            // console.log('the errors have changed.');
        }
    }
};
</script>
