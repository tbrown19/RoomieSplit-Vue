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
            return parseFloat(this.$store.getters.rooms[this.index].payment).toFixed(2);
        },
        occupants: function () {
            return this.$store.getters.rooms[this.index].occupants;
        }
    }
};
</script>

<style>
.payment-value {
    font-size: 1.1rem;
}
</style>
