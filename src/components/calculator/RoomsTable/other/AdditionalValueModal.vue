<template>
    <form action="">
        <div class="modal-card">
            <section class="modal-card-body">
                <h2 class="is-section-head">Additional Values</h2>
                <hr>
                <div id="privateSpaceValue">
                    <p class="inputDescription">
                        <div v-if="currentValues">
                            <ul>
                                <li v-for="(value, key, index) in currentValues" v-bind:key="key">
                                    {{key}} {{value}}
                                </li>
                            </ul>
                        </div>
                        <div v-else>
                            Currently no additonal values. You can add one below!
                        </div>
                    </p>
                </div>
    
                <hr>
                <h2 class="is-section-head" id="addNewHeader">Add New</h2>
                <el-row type="flex">
                    <el-col :span="14">
                        <input id="nameInput" class="input" type="text" v-model="newAddition.name" placeholder="Name - Ex: Private Bathroom">
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <input id="valueInput" class="input" type="number" v-model="newAddition.value" placeholder="Value - Ex: $30">
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <button :disabled="!saveDisabled" @click.prevent="addNew" id="addButton" class="button is-primary is-large"> Add </button>
                </el-row>
            </section>
        </div>
    </form>
</template>

<script>

export default {
    props: ['index'],

    computed: {
        saveDisabled() {
            const formHasNoError = this.errors.errors.length === 0;
            const valuesNotEmpty = this.newAddition.name !== '' && this.newAddition.value !== '';

            return formHasNoError && valuesNotEmpty;
        }
    },
    methods: {
        addNew() {
            this.$store.dispatch('addAdditionalValue', {
                roomsIndex: this.index,
                name: this.newAddition.name,
                value: this.newAddition.value
            });
            this.currentValues = this.$store.getters.additionalValues(this.index);
            this.newAddition.name = '';
            this.newAddition.value = '';
        }
    },
    data: function () {
        return {
            newAddition: {
                name: '',
                value: ''
            },
            currentValues: this.$store.getters.additionalValues(this.index)
        };
    }
};
</script>

<style scoped>
.modal-card {
    min-width: 500px;
    max-width: 600px;
    width: auto;
    color: black;
}

.is-section-head {
    font-size: 1.3rem;
    text-align: center;
}

hr {
    margin: .75rem 0rem .75rem 0rem;
}

.newValueInputs {
    margin-bottom: 2.5rem;
}

#addButton {
    margin-top: 1rem;
    padding: 0 3rem 0 3rem;
}

#addNewHeader {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
}
</style>
