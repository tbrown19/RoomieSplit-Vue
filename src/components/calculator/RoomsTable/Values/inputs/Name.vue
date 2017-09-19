<template>
    <div>
        <input @input="$emit('valueUpdated', 'name', newItemName)" type="text" v-model="newItemName" name="name" v-validate="'required|alpha_spaces|max:20'" :placeholder="placeHolderText" class="input" :class="{'is-danger': errors.has('name'), 'is-success': isSuccess}">
        <slide-fade>
            <span v-if="errors.has('name') && !valueAddedToList" class="help is-danger">{{ errors.first('name') }}</span>
        </slide-fade>
    </div>
</template>

<script>
import SlideFade from '../../../../transitions/SlideFade.vue';
export default {
    props: ['type', 'valueAddedToList'],
    components: {
        SlideFade
    },
    watch: {
        valueAddedToList() {
            this.newItemName = '';
            // Wait until the next tick to clear the error, that way the value can be updated to nothing but won't then show an error because its empty.
            this.$nextTick(function () {
                this.errors.clear();
            });
        }
    },
    computed: {
        isSuccess() {
            return !this.errors.has('name') && this.newItemName !== '';
        },
        placeHolderText() {
            return this.type === 'positive' ? 'Name - Ex: Private Bathroom' : 'Name - Ex: No Door';
        }
    },
    data: function () {
        return {
            newItemName: ''
        };
    }
};
</script>

