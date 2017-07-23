<template>
    <modal>
        <div class="level">
            <div class="level-left">
                <h2 class="is-section-head">
                    {{ typeToTitle }} Values - Current Total: {{ currentTotal }}
                </h2>
    
            </div>
            <div class="level-right">
                <a @click="$emit('close')">
                    <b-icon icon="close"></b-icon>
                </a>
            </div>
        </div>
        <list :currentValues="currentValues"></list>
        <add-new @valuesUpdated="valuesUpdated" :index="index" :type="type"></add-new>
    </modal>
</template>

<script>
import Modal from '../../../Generic/Modal.vue';
import List from './List.vue';
import AddNew from './AddNew.vue';
export default {
    name: 'ValuesModal',
    props: ['index', 'type'],

    components: {
        List, AddNew, Modal
    },

    computed: {
        typeToTitle() {
            return this.type.charAt(0).toUpperCase() + this.type.slice(1);
        }
    },
    methods: {
        valuesUpdated() {
            // update current value by setting it to a new object, that way vue can actually detect the change and rerender it.
            this.currentValues = { ...this.$store.getters.valuesByType(this.index, this.type) };
            this.currentTotal = this.$store.getters.totalValueByType(this.index, this.type);
            this.$emit('recalculatePayment');
        }
    },

    data: function () {
        return {
            currentValues: this.$store.getters.valuesByType(this.index, this.type),
            currentTotal: this.$store.getters.totalValueByType(this.index, this.type)
        };
    }
};
</script>

<style scoped>
.is-section-head {
    font-size: 1.3rem;
    text-align: center;
}

.modal-card {
    min-width: 500px;
    max-width: 600px;
    width: auto;
    color: black;
}


hr {
    margin: .75rem 0rem .75rem 0rem;
}
</style>
