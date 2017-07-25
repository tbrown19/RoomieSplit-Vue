<template>
    <modal>
        <h2>Visulizations</h2>
    </modal>
</template>

<script>
import Modal from '../../Generic/Modal.vue';
export default {
    name: 'VisualizationModal',
    props: ['totalArea', 'rooms'],
    components: {
        Modal
    }
};
</script>

<style lang="scss" scoped>

</style>
