<template>
    <modal>
        <h2 class="is-section-head">Steps</h2>
        <h2 class="is-subsection-head">Begin by filling out the area for each room.</h2>
        <p>
            This can be done by either entering the measurements or directly inputing the area of the room.
        </p>
    
        <br>
    
        <h2 class="is-subsection-head">Then update the number of occupants.</h2>
        <p>
            The default is one but if it is changed it will display the payment for each occupant.
        </p>
    
        <hr>
    
        <h2 class="is-section-head">Settings</h2>
        <h2 class="is-subsection-head">Values that effect all rooms' payments</h2>
        <p>
            Click the settings button to change values that effect the entire tables payment calculations, such as changing how much private space is worth compared to shared space.
        </p>
    
        <br>
    
        <h2 class="is-subsection-head">Values that effect an individual room's payments.</h2>
        <p>
            Click the arrow on the left side of the room to be shown extra information about the room. It also shows additional inputs that can be set to increase the value of a room, such as having a private bathroom.
        </p>
    
        <hr>
    
        <div class="has-text-centered close-modal-div" @click="$emit('close')">
            <a id="closeButton">Close</a>
        </div>
    </modal>
</template>

<script>
import Modal from './Modal.vue';
export default {
    components: {
        Modal
    }
};
</script>

<style scoped>
.is-subsection-head {
    font-size: 1.2rem;
    font-family: 'Lato', sans-serif;
    border-bottom: .4px solid rgb(50, 65, 87);
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
