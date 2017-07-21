<template>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <div style="font-size: 1rem">
                    <label class="label info-header">Extra Information:</label>
                    <p>Percent of the total space: {{ percentOfTotalSpace }}</p>
                    <p>Percent of the private space: {{ percentOfPrivateSpace }}</p>
                    <!-- <p>Private Payment: {{ roundToTwoDecimalPlaces(room.privatePayment) }}</p> -->
                </div>
            </div>
            <div class="level-item notes">
                <div style="font-size: 1rem">
                    <label class="label info-header">Notes:</label>
                    <input @input="noteUpdated" class="input" type="text" placeholder="Ex: Jon's room" v-model='currentNote'>
                </div>
            </div>
        </div>
        <div class="level-right">
            <button class="button is-primary is-medium add-value" @click="handleClear">Add Value</button>
            <p></p>
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
        },

        noteUpdated() {
            console.log(this.currentNote);
            this.$store.dispatch('note', {
                roomsIndex: this.index,
                value: this.currentNote
            });
        }
    },

    data: function () {
        return {
            currentNote: this.$store.getters.note(this.index)
        };
    }
};
</script>

<style scoped>
.info-header {
    font-size: 1.1rem;
    font-weight: 700;
}

.notes {
    margin-left: 1rem;
}

.add-value {
    margin-right: 1rem;
}
</style>
