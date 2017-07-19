<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Settings</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Private Space Value Modifier">
    
                </b-field>
                <input name="commonSpaceValueModifier" v-model.number="commonSpaceValueModifier" v-validate="`required|between:1,10`" step=".1" :class="{'input': true, 'is-danger': errors.has('commonSpaceValueModifier'), 'is-success': !errors.has('commonSpaceValueModifier') 
                                            && this.commonSpaceValueModifier != ''}" type="number" placeholder="1">
                <p>
                    How much more valuable should private space be compared to shared space. A value of 1 means private space is valued the same as common space.    
                </p>
                <hr>
                <div class="has-text-centered close-modal-div" @click="saveChanges">
                    <a v-if="formHasNoErrors" class="is-subsection-head">Save Changes</a>
                </div>
            </section>
    
        </div>
    </form>
</template>

<script>

export default {
    computed: {
        formHasNoErrors() {
            return this.errors.errors.length === 0;
        }
    },
    methods: {
        saveChanges() {
            this.$store.commit('SET_COMMON_SPACE_VALUE_MODIFIER', this.commonSpaceValueModifier);
            this.$emit('updateRoomConfiguration');
            this.$parent.close();
        }
    },
    data: function () {
        return {
            commonSpaceValueModifier: this.$store.getters.commonSpaceValueModifier
        };
    }
};
</script>

<style scoped>
.modal-card {
    min-width: 300px;
    max-width: 500px;
    width: auto;
    color: black;
}

.input {
    max-width: 50%;
}
</style>
