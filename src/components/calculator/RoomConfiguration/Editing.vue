<template>
    <div>
        <h2 class="is-title"> {{ capitalizedName }} </h2>
        <hr class="hidden-hr">
        <input :id="name" v-model.number="currentValue" v-validate="`required|between:${min},${max}`" :class="{'input': true, 'is-danger': errors.has(name), 'is-success': validInput }" type="number" :placeholder="0" :name="name">
        <slide-fade>
            <p v-if="errors.has(name)" class="input-error help is-danger has-text-centered">{{ errors.first(name) }}</p>
        </slide-fade>
    </div>
</template>


<script>
import SlideFade from '../../transitions/SlideFade.vue';
export default {
    name: 'Primary-Input',

    props: ['name', 'value', 'min', 'max', 'tooltip'],

    components: {
        SlideFade
    },

    computed: {
        capitalizedName: function () {
            return this.name.charAt(0).toUpperCase() + this.name.slice(1);
        },

        validInput: function () {
            return !this.errors.has(this.name) && this.value !== '';
        }
    },

    watch: {
        value: function () {
            this.$emit('inputValueChanged', this.name, this.value, this.validInput);
        }
    },

    data: function () {
        return {
            currentValue: this.value
        };
    }
};
</script>


<style scoped>
h2 {
    font-weight: 300;
}

.hidden-hr {
    visibility: hidden;
    margin: .25em;
}

.input {
    max-width: 75%;
    margin-bottom: .675em;
}
.help{
    font-size: 1rem;
}
</style>
