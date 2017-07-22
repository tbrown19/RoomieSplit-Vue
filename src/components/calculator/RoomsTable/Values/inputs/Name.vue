<template>
    <div>
        <input @input="$emit('valueUpdated', 'name', newItemName)" type="text" v-model="newItemName" name="name" v-validate="'required|alpha_spaces|max:15'" :placeholder="placeHolderText" class="input" :class="{'is-danger': errors.has('name'), 'is-success': isSuccess}">
        <slide-fade>
            <span v-if="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </slide-fade>
    </div>
</template>

<script>
import SlideFade from '../../../../transitions/SlideFade.vue';
export default {
    props: ['type'],
    components: {
        SlideFade
    },
    computed: {
        isSuccess() {
            return !this.errors.has('name') && this.newItemName !== '';
        },
        placeHolderText() {
            if (this.type === 'positive') {
                return 'Name - Ex: Private Bathroom';
            }
            return 'Name - Ex: No Door';
        }
    },
    data: function () {
        return {
            newItemName: ''
        };
    }
};
</script>

