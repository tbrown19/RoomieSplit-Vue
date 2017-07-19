<template>
    <div class="modal-card">
        <section class="modal-card-body">
            
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
    
            <h2 class="is-subsection-head">Values that effect all rooms' payments</h2>
            <p>
                Click the settings button to change values that effect the entire tables payment calculations, such as changing how much private space is worth compared to share space.
            </p>
            
            <br>
    
            <h2 class="is-subsection-head">Values that effect an individual room's payments.</h2>
            <p>
                Click the arrow on the left side of the room to be shown extra information about the room. 
                It also shows additional inputs that can be set to increase the value of a room, such as having a private bathroom.
            </p>
            
            
            <div class="has-text-centered close-modal-div" @click="$parent.close()">
                <a class="is-subsection-head">Close</a>
            </div>
        </section>
    </div>
</template>

<script>
export default {
};
</script>

<style>
.modal-card {
    width: auto;
}

.modal-card-body {
    color: black;
    max-width: 500px;
}

.modal-background {
    background-color: rgba(10, 10, 10, 0.22) !important;
}

.is-subsection-head {
    font-size: 1.2rem;
}
</style>
