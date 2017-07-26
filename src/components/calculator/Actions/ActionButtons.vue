<template>
    <div>
        <hr>
        <div class="level">
    
            <div class="level-item">
                <a @click="isHelpModalActive = true" class="button is-info is-medium is-outlined">
                    <b-icon icon="info"></b-icon>
                    <span class="icon-message">Help</span>
                </a>
            </div>
    
            <div class="level-item">
                <a @click="isSettingsModalActive = true" class="button is-primary is-medium is-outlined">
                    <b-icon icon="settings"></b-icon>
                    <span class="icon-message">Settings</span>
                </a>
            </div>
    
            <div class="level-item">
                <slide-fade>
                    <a v-if="showRentGraph" @click="viewGraphsPage" class="button is-primary is-medium is-outlined">
                        <b-icon icon="pie_chart"></b-icon>
                        <span class="icon-message">Payments Graph </span>
                    </a>
                </slide-fade>
    
            </div>
    
            <div class="level-item">
                <a @click="save" :class="{'button is-success is-medium is-outlined': true, 'is-loading': isSaving}">
                    <b-icon icon="save"></b-icon>
                    <span class="icon-message">Save</span>
                </a>
            </div>
            <div class="level-item">
                <a @click="clearAll" class="button is-danger is-medium is-outlined">
                    <b-icon icon="clear"></b-icon>
                    <span class="icon-message">Clear</span>
                </a>
            </div>
    
        </div>
    
        <help-modal v-if="isHelpModalActive" @close="isHelpModalActive = false"></help-modal>
        <settings-modal v-if="isSettingsModalActive" @updateRoomConfiguration="updateRoomConfiguration" @close="isSettingsModalActive = false">
        </settings-modal>
    
    </div>
</template>


<script>
import SlideFade from '../../../components/transitions/SlideFadeSlow.vue';
import HelpModal from '../Help/HelpModal.vue';
import SettingsModal from './SettingsModal.vue';
export default {
    props: ['isSaving', 'showRentGraph'],

    components: {
        HelpModal, SettingsModal, SlideFade
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
        },
        viewGraphsPage() {
            // Get the id from the url,
            // Transition to the charts page with the router using the id from the url.
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
