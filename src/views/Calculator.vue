<template>
    <div>
        {{ housingInformation }}
        <RoomsTable></RoomsTable>
    </div>
</template>


<script>
import RoomsTable from '../components/RoomsTable/table.vue';
export default {
    components: {
        RoomsTable
    },
    
    data: function () {
        return {
            housingInformation: this.$store.state.housingInformation
        }
    }
}
</script>
