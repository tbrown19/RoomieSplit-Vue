<template>
    <div>
        <hr>
        <div class="level">
            <div class="level-left">
                <a @click="isComponentModalActive = true" class="button is-info is-large is-outlined">Help</a>
                <a @click="clearAll" class="button is-primary is-large is-outlined">Settings</a>
            </div>
            <div class="level-right">
                <a @click="save" :class="{'button is-success is-large is-outlined': true, 'is-loading': isSaving}">Save</a>
                <a @click="clearAll" class="button is-danger is-large is-outlined">Clear</a>
            </div>
        </div>
        <b-modal :active.sync="isComponentModalActive" has-modal-card data-backdrop="false">
            <help-modal v-bind="formProps"></help-modal>
        </b-modal>
    </div>
</template>


<script>
import HelpModal from './HelpModal.vue';
export default {
    props: ['isSaving'],

    components: {
        HelpModal
    },

    methods: {
        save() {
            this.$emit('save');
        },
        clearAll() {
            this.$emit('clearAll');
        }
    },

    data: function () {
        return {
            saving: this.isSaving,
            isComponentModalActive: false,
            formProps: {
                email: 'evan@you.com',
                password: 'testing'
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.button {
    margin: .0rem 1rem 0rem 1rem;
    padding: 0rem 1.5rem 0rem 1.5rem;
}

// .modal.is-active {
//     overflow-y: scroll;
// }

</style>
