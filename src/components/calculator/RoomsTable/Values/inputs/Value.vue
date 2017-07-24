<template>
    <div>
        <input @input="$emit('valueUpdated', 'value', newItemValue)" type="number"  v-model.number="newItemValue" name="value" v-validate="'required|between:1,300'" :placeholder="placeHolderText" class="input" :class="{'is-danger': errors.has('value'),'is-success': isSuccess}">
    
        <slide-fade>
            <span v-if="errors.has('value') && !valueAddedToList" class="help is-danger">{{ errors.first('value') }}</span>
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
            // Update the value to nothing, then give vue a chance to commit the change to the model before clearing the errors on vee validate.
            this.newItemValue = '';
            this.errors.clear();
            this.$nextTick(function () {
                this.errors.clear();
            });
        }
    },
    computed: {
        isSuccess() {
            return !this.errors.has('value') && this.newItemValue !== '';
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

