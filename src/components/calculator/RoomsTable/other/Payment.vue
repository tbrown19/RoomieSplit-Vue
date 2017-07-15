<template>
    <div class="payment-value" v-if="payment > 0">
        <h2>{{ roundedPayment }}</h2>
        <div v-if="occupants > 1">
            each
        </div>
    </div>
</template>


<script>
export default {
    props: ['payment', 'occupants'],
    computed: {
        roundedPayment: function () {
            return parseFloat(this.payment).toFixed(2);
        }
    }
};
</script>

<style>
.payment-value {
    font-size: 1.1rem;
}
</style>
