<template>
    <div>
        <hr>
        <el-row type="flex" justify="center">
            <a @click="save" :class="{'button is-primary is-large is-outlined': true, 'is-loading': isSaving}">Save</a>
            <a @click="clearAll" class="button is-danger is-large is-outlined">Clear</a>
        </el-row>
    </div>
</template>


<script>
export default {
    props: ['isSaving'],

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
            saving: this.isSaving
        };
    }
};
</script>

<style scoped>
.button {
    margin: .0rem 1rem 0rem 1rem;
    padding: 0rem 1.5rem 0rem 1.5rem;
}
</style>
