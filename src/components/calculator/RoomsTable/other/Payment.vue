<template>
    <div class="payment-value" v-if="roundedPayment > 0">
        <h2>{{ roundedPayment }}</h2>
        <div v-if="occupants > 1">
            each
        </div>
    </div>
</template>


<script>
export default {
    props: ['index'],
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

<style>
.payment-value {
    font-size: 1.1rem;
}
</style>
