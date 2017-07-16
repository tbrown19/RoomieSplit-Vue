<template>
    <div>
        <h1 style="font-size: 1rem">
            Extra Information:</h1>
        <div style="font-size: 1rem">
            <p>Percent of the total space: {{ percentOfTotalSpace }}</p>
            <p>Percent of the private space: {{ percentOfTotalSpace }}</p>
            <!-- <p>Private Payment: {{ roundToTwoDecimalPlaces(room.privatePayment) }}</p> -->
        </div>
        <div class="is-pulled-right">
            <button class="button is-danger is-medium" @click="handleClear(room)">Clear</button>
        </div>
    </div>
</template>


<script>
export default {
    props: ['RoomSplitter', 'room'],
    created() {
        console.log(this.room);
    },

    computed: {
        percentOfTotalSpace() {
            let percentOfTotalSpace = this.room.percentOfTotalSpace || 0;
            return this.readablePercent(percentOfTotalSpace);
        },
        percentOfPrivateSpace() {
            // Either get it off the object or calculate it. We usually will only calculate it on the inital load of the file.
            let percentOfTotalSpace = this.room.percentOfPrivateSpace || 0;
            return this.readablePercent(percentOfTotalSpace);
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

        handleClear(room) {
            // helper for rounding. use later. = parseFloat(footage).toFixed(2);
            console.log(room);
            room.clear();
            // this.$emit('clearRoom', room);
        }
    }
};
</script>
