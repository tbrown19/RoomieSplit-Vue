<template>
    <card>
        <div slot="content">
            <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content" class="has-text-centered input-tool-tip">
                    {{ tooltip}}
                    <br> Value can be between {{ min }} and {{ max }}
                </div>
                <h2 class="is-title">
                    {{ name }}
                </h2>
            </el-tooltip>
    
            <hr>
    
            <input :id="name" v-model.number="value" v-validate="`required|between:${min},${max}`" :class="{'input': true, 'is-danger': errors.has(name), 'is-success': validInput }" type="number" :placeholder="0" :name="name">
            <slide-fade>
                <p v-if="errors.has(name)" class="input-error help is-danger has-text-centered">{{ errors.first(name) }}</p>
            </slide-fade>
        </div>
    </card>
</template>

<script>
import Card from '../generic/Card.vue';
import SlideFade from '../transitions/SlideFade.vue';

export default {
    props: ['name', 'min', 'max', 'tooltip'],

    components: {
        Card, SlideFade
    },

    computed: {
        validInput() {
            return !this.errors.has(this.name) && this.value !== '';
        }
    },

    watch: {
        validInput: function () {
            console.log('validness has changed in the prim input');
            this.$emit('inputValidityChanged', this.name, this.value, this.validInput);
        }
    },

    data: function () {
        return {
            value: ''
        };
    }
};

</script>

<style lang="scss" scoped>
.input {
    max-width: 75%;
}

.is-title {
    font-weight: 300;
}

.is-success {
    border-width: 2px;
}

.help {
    font-size: 1rem;
}

.input-tool-tip {
    padding: .5rem;
    font-size: 1.1rem;
}
</style>
