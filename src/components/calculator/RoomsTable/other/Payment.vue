<template>
    <div class="payment-value" v-if="payment > 0">
        <h2>{{ payment }}</h2>
        <div v-if="occupants > 1">
            each
        </div>
    </div>
</template>


<script>
export default {
    props: ['payment', 'occupants']
};
</script>

<style>
.payment-value{
    font-size: 1.1rem;
}
</style>
