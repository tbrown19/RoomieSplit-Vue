<template>
    <div>
        <hr>
        <el-row type="flex" justify="center">
            <button @click="save" class="button is-primary is-large is-outlined">Save</button>
            <button @click="clearAll" class="button is-danger is-large is-outlined">Clear</button>
        </el-row>
    </div>
</template>


<script>
export default {
    methods: {
        save() {
            this.$emit('save');
        },
        clearAll() {
            this.$emit('clearAll');
        }
    }
};
</script>

<style scoped>
.button {
    margin: .0rem 1rem 0rem 1rem;
    padding: 0rem 1.5rem 0rem 1.5rem;
}

</style>
