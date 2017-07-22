<template>
    <b-tabs v-model="activeTab" type="is-boxed">
        <b-tab-item label="Getting Started">
            <h2 class="is-title">
                Begin by filling out the area for each room.
            </h2>
            This can be done by entering the measurements or directly inputing the area of the room.
            <hr>
            <h2 class="is-title">
                Then update the number of occupants.
            </h2>
            The default is one but if it is changed it will display the payment for each occupant.
        </b-tab-item>
    
        <b-tab-item label="Next Steps">
            <h2 class="is-title">
                You can customize values that will effect each rooms payment.
            </h2>
            Click the settings button to change values that effect the entire tables payment calculations, such as changing how much private space is worth compared to shared space.
            <hr>
            <h2 class="is-title">
                Values that effect an individual room's payments.
            </h2>
            Check out the add value and remove value tab above to see how you can add or remove value from a specific room.
    
        </b-tab-item>
    
        <b-tab-item label="Add Value">
            <h2 class="is-title">
                How to add value to a room - positives of the room.
            </h2>
            First click the arrow on the left side of the room, and then click the add value button. You now have the option to add, edit, or delete a value.
            <hr>
            <h2 class="is-title">
                Examples
            </h2>
            <ul>
                <li>
                    Private Bathroom:
                    <span class="positive-value">$50</span>
                </li>
                <li>
                    Large Closet:
                    <span class="positive-value">$25</span>
                </li>
                <li>
                    Windows:
                    <span class="positive-value">$40</span>
                </li>
    
            </ul>
        </b-tab-item>
    
        <b-tab-item label="Remove Value">
            <h2 class="is-title">
                How to remove value from a room - negatives of the room.
            </h2>
            First click the arrow on the left side of the room, and then click the remove value button. You now have the option to add, edit, or delete a value.
            <hr>
            <h2 class="is-title">
                Examples
            </h2>
            <ul>
                <li>
                    No Door:
                    <span class="negative-value">-$60</span>
                </li>
                <li>
                    Noisy:
                    <span class="negative-value">-$20</span>
                </li>
                <li>
                    Loft:
                    <span class="negative-value">-$25</span>
                </li>
                
    
            </ul>
        </b-tab-item>
    
    </b-tabs>
</template>

<script>
export default {
    data: function () {
        return {
            activeTab: 0
        };
    }
};
</script>

<style scoped>
.is-title {
    font-size: 1.2rem;
}

.positive-value {
    color: #23d160;
}

.negative-value {
    color: #ff3860;
}
</style>
