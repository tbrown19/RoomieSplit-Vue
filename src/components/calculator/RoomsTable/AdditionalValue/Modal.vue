<template>
    <form action="">
        <div class="modal-card">
            <section class="modal-card-body">
                <h2 class="is-section-head">Additional Values</h2>
                <list :currentValues="currentValues"></list>
                <add-new @valuesUpdated="valuesUpdated" :index="index"></add-new>
            </section>
        </div>
    </form>
</template>

<script>
import List from './List.vue';
import AddNew from './AddNew.vue';
export default {
    props: ['index'],

    components: {
        List, AddNew
    },
    methods: {
        valuesUpdated() {
            // update current value by setting it to a new object, that way vue can actually detect the change and rerender it.
            this.currentValues = { ...this.$store.getters.additionalValues(this.index) };
        }
    },

    data: function () {
        return {
            currentValues: this.$store.getters.additionalValues(this.index)
        };
    }
};
</script>

<style scoped>
.is-section-head {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 1rem;
}

.modal-card {
    min-width: 500px;
    max-width: 600px;
    width: auto;
    color: black;
}


hr {
    margin: .75rem 0rem .75rem 0rem;
}
</style>
