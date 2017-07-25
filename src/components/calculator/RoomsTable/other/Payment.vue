<template>
    <transition name="slide-fade">
    
        <div class="payment-value" v-if="roundedPayment > 0">
    
            <h2>{{ roundedPayment }}</h2>
            <div v-if="occupants > 1">
                each
            </div>
    
        </div>
    </transition>
</template>


<script>
import fade from '../../../transitions/SlideFadeSlow.vue';
export default {
    name: 'payment',
    props: ['index'],
    components: {
        fade
    },
    computed: {
        roundedPayment: function () {
            return parseFloat(this.$store.getters.payment(this.index)).toFixed(2);
        },
        occupants: function () {
            return this.$store.getters.occupants(this.index);
        }
    }
};
</script>

<style scoped>
.payment-value {
    font-size: 1.1rem;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */

{
    transform: translateX(10px);
    opacity: 0;
}
</style>
