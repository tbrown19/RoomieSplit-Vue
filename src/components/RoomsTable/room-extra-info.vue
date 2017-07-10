<template>
    <div>
        <h1 style="font-size: 1.2rem">
            Extra Information:</h1>
        <div style="font-size: 1.1rem">
            <p>Percent of the total space: {{ readablePercent(room.percentOfTotalSpace) }}</p>
            <p>Percent of the private space: {{ readablePercent(room.percentOfPrivateSpace) }}</p>
            <p>Private Payment: {{ roundToTwoDecimalPlaces(room.privatePayment) }}</p>
        </div>
        <div class="is-pulled-right">
            <el-button size="large" @click="handleEdit(room)">Edit</el-button>
            <el-button size="large" type="danger" @click="handleClear(room)">Clear</el-button>
        </div>
    </div>
</template>


<script>
export default {
    props: ['room'],


    methods: {
        //Break these out to some helper class maybe? would have been nice as filters..
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
            //this.$emit('clearRoom', room);
        },
    }
}
</script>
