<template>
    <div>
        <hr>
        <div class="level">
            <div class="level-left">
                <a @click="isHelpModalActive = true" class="button is-info is-large is-outlined">Help</a>
                <a @click="isSettingsModalActive = true" class="button is-primary is-large is-outlined">Settings</a>
            </div>
            <div class="level-right">
                <a @click="save" :class="{'button is-success is-large is-outlined': true, 'is-loading': isSaving}">Save</a>
                <a @click="clearAll" class="button is-danger is-large is-outlined">Clear</a>
            </div>
        </div>
        <b-modal :active.sync="isHelpModalActive" has-modal-card>
            <help-modal></help-modal>
        </b-modal>
        <b-modal :active.sync="isSettingsModalActive" has-modal-card>
            <settings-modal @updateRoomConfiguration="updateRoomConfiguration"></settings-modal>
        </b-modal>
    </div>
</template>


<script>
import HelpModal from './HelpModal.vue';
import SettingsModal from './SettingsModal.vue';
export default {
    props: ['isSaving'],

    components: {
        HelpModal, SettingsModal
    },

    methods: {
        save() {
            this.$emit('save');
        },
        clearAll() {
            this.$emit('clearAll');
        },
        updateRoomConfiguration() {
            this.$emit('updateRoomConfiguration');
        }
    },

    data: function () {
        return {
            saving: this.isSaving,
            isHelpModalActive: false,
            isSettingsModalActive: false
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
