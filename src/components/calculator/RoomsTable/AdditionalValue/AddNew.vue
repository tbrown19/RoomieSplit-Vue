<template>
    <div>
        <h2 class="is-section-head" id="addNewHeader">
            Add New</h2>
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
    </div>
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
            this.newAddition.name = '';
            this.newAddition.value = '';
            let currentValues = this.$store.getters.additionalValues(this.index);
            console.log(Object.keys(currentValues));
            this.$emit('valuesUpdated');
        }
    },
    data: function () {
        return {
            newAddition: {
                name: '',
                value: ''
            }
        };
    }
};
</script>

<style scoped>
.is-section-head {
    font-size: 1.3rem;
    text-align: center;
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
