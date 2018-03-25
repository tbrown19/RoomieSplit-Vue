<template>
    <card-with-footer>
        <div slot="content">
            <transition name="slide-fade" mode="out-in">
                <div v-if="!editing">
                    <viewing :name="name" :value="currentValue"></viewing>
                </div>
                <div v-else key="editing">
                    <editing @valueChanged="inputUpdated" :name="name" :value="value" :min="min" :max="max" :tooltip="tooltip"></editing>
                </div>
            </transition>
        </div>
        <footer class="card-footer" slot="footer">
            <a class="card-footer-item" @click="edit" v-if="!editing">Edit</a>
            <a class="card-footer-item" @click="save" v-else>
                <span v-if="validInput">Save</span>
            </a>
        </footer>
    </card-with-footer>
</template>

<script>
import CardWithFooter from '../../generic/CardWithFooter.vue';
import Viewing from './Viewing.vue';
import Editing from './Editing.vue';

export default {
    name: 'Primary-Input',

    props: ['configKey', 'name', 'value', 'min', 'max', 'tooltip'],

    components: {
        CardWithFooter, Editing, Viewing
    },

    methods: {
        inputUpdated(value, valid) {
            this.currentValue = value;
            this.validInput = valid;
        },

        edit() {
            this.editing = true;
        },

        save() {
            this.editing = false;
            this.$emit('saveInput', this.configKey, this.currentValue);
        }
    },

    data: function () {
        return {
            currentValue: this.value,
            editing: false,
            validInput: true
        };
    }
};

</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: all .2s ease;
}

.slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>
