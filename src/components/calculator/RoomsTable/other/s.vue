<template>
    <div class="table-errors">
        penis
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

    data: function () {
        console.log('hmm');
        console.log(this.tableErrors);
        return {
            currentErrors: [...this.tableErrors]
        };
    }
};
</script>
