<template>
    
</template>


<script>
import MeasurementInput from './measurement-input.vue';
import FootageInput from './footage-input.vue';
import OccupantsInput from './occupants-input.vue';
import RoomExtraInfo from './room-extra-info.vue';
∂∂
export default {
    name: 'Table-Row',

    props: ['roomConfiguration'],

    components: {
        MeasurementInput, FootageInput, OccupantsInput, RoomExtraInfo
    },
    data: function () {
        return {

        };
    }
};
</script>
