<template>
    <modal>
        <div id="help-modal">
            <tabs></tabs>
        </div>
        <div class="has-text-centered close-modal-div" @click="$emit('close')">
            <a id="closeButton">Close</a>
        </div>
    </modal>
</template>

<script>
import Modal from '../../Generic/Modal.vue';
import Tabs from './Tabs.vue';

export default {
    name: 'HelpModal',
    components: {
        Modal, Tabs
    }
};
</script>

<style scoped>
 #help-modal {
    min-height: 45vh;
} 

.is-subsection-head {
    font-size: 1.2rem;
    font-family: 'Lato', sans-serif;
    border-bottom: .4px solid rgba(50, 65, 87, .2);
}

.is-section-head {
    font-size: 1.3rem;
    text-align: center;
    font-weight: 700;
    font-family: 'Lato', sans-serif;
    color: rgb(50, 65, 87);
}

.close-modal-div {
    font-size: 1.2rem;
}

hr {
    margin: .75rem 0rem .75rem 0rem;
}
</style>
