<template>
    <div>
        <hr>
        <div class="level">
            <div class="level-left">
                <a @click="isHelpModalActive = true" class="button is-info is-large is-outlined">
                    <b-icon icon="info"></b-icon>
                    <span class="icon-message">Help</span>
                </a>
                <a @click="isSettingsModalActive = true" class="button is-primary is-large is-outlined">
                    <b-icon icon="settings"></b-icon>
                    <span class="icon-message">Settings</span>
                </a>
            </div>
            <div class="level-right">
                <a @click="save" :class="{'button is-success is-large is-outlined': true, 'is-loading': isSaving}">
                    <b-icon icon="save"></b-icon>
                    <span class="icon-message">Save</span>
                </a>
                <a @click="clearAll" class="button is-danger is-large is-outlined">
                    <b-icon icon="clear"></b-icon>
                    <span class="icon-message">Clear</span>
                </a>
            </div>
        </div>
        <!-- <b-modal :active.sync="isHelpModalActive" has-modal-card>
                <help-modal></help-modal>
            </b-modal> -->
        <help-modal v-if="isHelpModalActive" @close="isHelpModalActive = false"></help-modal>
        <settings-modal v-if="isSettingsModalActive"
         @updateRoomConfiguration="updateRoomConfiguration" @close="isSettingsModalActive = false"></settings-modal>
    
    </div>
</template>


<script>
import HelpModal from '../Help/HelpModal.vue';
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
