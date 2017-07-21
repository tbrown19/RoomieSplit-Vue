<template>
    <form action="">
        <div class="modal-card">
            <section class="modal-card-body">
                <h2 class="is-section-head">Settings</h2>
                <hr>
                <div id="privateSpaceValue">
                    <label class="label"> Private Space Value Modifier: </label>
                    <div class="control">
                        <input name="commonSpaceValueModifier" v-model.number="commonSpaceValueModifier" v-validate="`required|between:1,10`" step=".1" :class="{'input': true, 'is-danger': errors.has('commonSpaceValueModifier'), 'is-success': !errors.has('commonSpaceValueModifier') 
                                                                && this.commonSpaceValueModifier != ''}" type="number" placeholder="1">
                    </div>
    
                    <p class="inputDescription">
                        Value of private space relative to shared space.
                        <br> A value of 2 means private space is considered twice as valuable as shared space.
                    </p>
                </div>
    
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
    props: ['index'],

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
            commonSpaceValueModifier: this.$store.getters.additionalValues
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
    max-width: 30%;
    margin-bottom: .2rem;
}

label {
    font-size: 1.2rem;
}
.inputDescription {
    max-width: 400px;
}

.is-section-head {
    font-size: 1.3rem;
    text-align: center;
}

hr {
    margin: .75rem 0rem .75rem 0rem;
}
</style>
