<template>
    <div class="table-errors">
        <div class="notification is-danger" v-for="tableError in currentErrors" :key="tableError">
            {{ tableError }}
        </div>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'table-errors',
    props: ['tableErrors'],
    computed: {
        currentErrors() {
            return [...this.tableErrors];
        }
    },
    watch: {
        tableErrors: function () {
            console.log('the errors have changed.');
        }
    }
};
</script>
