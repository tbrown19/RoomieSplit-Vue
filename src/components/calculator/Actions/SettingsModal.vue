<template>
    <modal>
        <h2 class="is-section-head">Settings</h2>
        <hr>
    
        <div class="settings-group" id="privateSpaceValue">
            <div class="level">
                <div class="level-left">
                    <label class="label"> Private Space Value Modifier:
                    </label>
                </div>
                <div class="level-right">
                    <input name="commonSpaceValueModifier" v-model.number="commonSpaceValueModifier" v-validate="`required|between:1,10`" step=".1" :class="{'input': true, 'is-danger': errors.has('commonSpaceValueModifier'), 
                                'is-success': !errors.has('commonSpaceValueModifier') && this.commonSpaceValueModifier != ''}" type="number" placeholder="1">
                </div>
    
            </div>
    
            <p class="inputDescription">
                <span class="description-header">
                    Value of private space relative to shared space.
                </span>
                <br> A value of 2 means private space is considered twice as valuable as shared space.
            </p>
        </div>
    
        <hr>
        <div class="has-text-centered close-modal-div">
            <a @click="$emit('close')">Close</a>
            <a v-if="formHasNoErrors" @click="saveChanges">Save</a>
            <span v-else class="disabled">Save</span>
        </div>
    </modal>
</template>

<script>
import Modal from '../../Generic/Modal.vue';
export default {
    components: {
        Modal
    },

    computed: {
        formHasNoErrors() {
            return this.errors.errors.length === 0;
        }
    },
    methods: {
        saveChanges() {
            this.$store.commit('SET_COMMON_SPACE_VALUE_MODIFIER', this.commonSpaceValueModifier);
            this.$emit('updateRoomConfiguration');
            this.$emit('close');
        }
    },
    data: function () {
        return {
            commonSpaceValueModifier: this.$store.getters.commonSpaceValueModifier
        };
    }
};
</script>

<style lang="scss" scoped>
label {
    font-size: 1.2rem;
}

.close-modal-div {
    font-size: 1.3rem;
    > a{
        margin: 0 1rem 0 1rem;
    }
}

.is-section-head {
    font-size: 1.3rem;
    text-align: center;
}

.disabled {
    color: gray;
}

.settings-group {
    border: 1px solid gainsboro;
    padding: 10px;
    border-radius: 5px;
}

.description-header {
    font-size: 1.1rem;
}

.level {
    padding-bottom: 10px;
    margin-bottom: .5rem;
    border-bottom: 1px solid gainsboro;
}
</style>
