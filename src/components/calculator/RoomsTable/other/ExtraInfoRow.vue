<template>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <div style="font-size: 1rem">
                    <h1 class="info-header">Extra Information:</h1>
                    <p>Percent of the total space: {{ percentOfTotalSpace }}</p>
                    <p>Percent of the private space: {{ percentOfPrivateSpace }}</p>
                    <!-- <p>Private Payment: {{ roundToTwoDecimalPlaces(room.privatePayment) }}</p> -->
                </div>
            </div>
    
        </div>
    
        <div class="level-right">
            <button class="button is-danger is-medium" @click="handleClear">Clear</button>
        </div>
    </div>
</template>


<script>
export default {
    props: ['index'],

    computed: {
        percentOfTotalSpace() {
            let percentOfTotalSpace = this.$store.getters.percentOfTotalSpace(this.index) || 0;
            return this.readablePercent(percentOfTotalSpace);
        },
        percentOfPrivateSpace() {
            console.log('in the computed' + this.$store.getters.percentOfPrivateSpace(this.index));
            // Either get it off the object or calculate it. We usually will only calculate it on the inital load of the file.
            let percentOfPrivateSpace = this.$store.getters.percentOfPrivateSpace(this.index) || 0;
            return this.readablePercent(percentOfPrivateSpace);
        }
    },

    methods: {
        readablePercent(percent) {
            const decimalToPercent = percent * 100;
            return this.roundToTwoDecimalPlaces(decimalToPercent);
        },

        roundToTwoDecimalPlaces(value) {
            return parseFloat(value).toFixed(2);
        },

        handleClear() {
            this.$emit('clearRoom', this.room);
        }
    }
};
</script>

<style>
.info-header {
    font-size: 1.1rem;
    font-weight: 700;
}
</style>
