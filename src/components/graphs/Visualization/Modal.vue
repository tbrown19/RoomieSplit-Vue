<template>
    <modal>
        <a @click="$emit('close')">
            <b-icon icon="close"></b-icon>
        </a>
        <tabs></tabs>
    </modal>
</template>

<script>
import Tabs from './Tabs.vue';
import Modal from '../../Generic/Modal.vue';
export default {
    name: 'VisualizationModal',
    components: {
        Modal, Tabs
    }
};
</script>

<style lang="scss" scoped>
.chart-header{
    font-size: 1.4rem;
}
.modal{
    max-height: 500px;
}
</style>
