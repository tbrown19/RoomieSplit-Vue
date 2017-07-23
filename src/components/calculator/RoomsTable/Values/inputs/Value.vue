<template>
    <div>
        <input @input="$emit('valueUpdated', 'value', newItemValue)" type="number" v-model.number="newItemValue" name="value" 
        v-validate="`required|between:${allowedValues}`" :placeholder="placeHolderText" class="input" :class="{'is-danger': errors.has('value'), 'is-success': isSuccess}">
        
        <slide-fade>
            <span v-if="errors.has('value')" class="help is-danger">{{ errors.first('value') }}</span>
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
            return !this.errors.has('name') && this.newItemValue !== '';
        },
        allowedValues() {
            if (this.type === 'positive') {
                return '1,300';
            }
            return '-300,-1';
        },

        placeHolderText() {
            if (this.type === 'positive') {
                return 'Value - Ex: $30';
            }
            return 'Value - Ex: -$50';
        }
    },
    data: function () {
        return {
            newItemValue: ''
        };
    }
};
</script>

