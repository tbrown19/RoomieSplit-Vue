<template>
    <div>
        <h2 class="is-section-head" id="addNewHeader">
            Add New
        </h2>
        <el-row type="flex">
            <el-col :span="14">
                <name :type="type" :valueAddedToList="valueAddedToList" @valueUpdated="valueUpdated"></name>
            </el-col>
            <el-col :span="8" :offset="1">
                <value :type="type" :valueAddedToList="valueAddedToList" @valueUpdated="valueUpdated"></value>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <button :disabled="!saveDisabled" @click.prevent="addNew" id="addButton" class="button is-primary is-large"> Add </button>
        </el-row>
    </div>
</template>


<script>
import Name from './inputs/Name.vue';
import Value from './inputs/Value.vue';
export default {
    name: 'AddNewValue',

    props: ['index', 'type'],

    components: {
        Name, Value
    },

    computed: {
        saveDisabled() {
            const formHasNoError = this.errors.errors.length === 0;
            const valuesNotEmpty = this.newValue.name !== '' && this.newValue.value !== '';
            return formHasNoError && valuesNotEmpty;
        }
    },
    methods: {
        valueUpdated(type, value) {
            this.valueAddedToList = false;
            this.newValue[type] = value;
        },
        addNew() {
            this.$store.dispatch('addValue', {
                roomsIndex: this.index,
                name: this.newValue.name,
                value: this.newValue.value,
                type: this.type
            });

            this.$store.dispatch('addToTotalValue', {
                roomsIndex: this.index,
                value: this.newValue.value,
                type: this.type
            });

            this.valueAddedToList = true;

            this.$emit('valuesUpdated');
        }
    },
    data: function () {
        return {
            newValue: {
                name: '',
                value: ''
            },
            // This changes after the user actual clicks add. this lets the inputs know they can clear them selves and not show errors.
            valueAddedToList: false
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
