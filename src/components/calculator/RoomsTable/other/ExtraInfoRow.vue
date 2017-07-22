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
            <button class="button is-primary add-value" @click="isAdditionalValueModalActive =true">
                <b-icon icon="add"></b-icon>
                <span class="icon-message">Value</span>
            </button>
            <button class="button is-info add-value" @click="isAdditionalValueModalActive =true">
                <b-icon icon="remove"></b-icon>
                <span class="icon-message">Value</span>
            </button>
            <button class="button is-danger" @click="handleClear">
                <b-icon icon="clear"></b-icon>
                <span class="icon-message">Clear</span>
            </button>
        </div>
        <b-modal :active.sync="isAdditionalValueModalActive" has-modal-card>
            <additional-value-modal :index="index"></additional-value-modal>
        </b-modal>
    </div>
</template>


<script>
import AdditionalValueModal from '../AdditionalValue/Modal.vue';
export default {
    props: ['index'],

    components: {
        AdditionalValueModal
    },

    computed: {
        percentOfTotalSpace() {
            let percentOfTotalSpace = this.$store.getters.percentOfTotalSpace(this.index) || 0;
            return this.readablePercent(percentOfTotalSpace);
        },
        percentOfPrivateSpace() {
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
            currentNote: this.$store.getters.note(this.index),
            isAdditionalValueModalActive: false
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
