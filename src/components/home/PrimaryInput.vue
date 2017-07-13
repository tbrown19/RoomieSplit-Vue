<template>
    <card>
        <div slot="content">
            <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content" class="has-text-centered input-tool-tip">
                    <slot name="toolTip"></slot>
                    Value can be between {{ minVal }} and {{ maxVal }}
                </div>
                <h2 class="is-title">
                    <slot name="inputDescription"></slot>
                </h2>
            </el-tooltip>
    
            <hr>
    
            <input :id="name" v-model.number="value" v-validate="`required|between:${minVal},${maxVal}`" :class="{'input': true, 'is-danger': errors.has(name), 'is-success': hasNoErrors }" type="number" :placeholder="0" :name="name">
            <slide-fade>
                <p v-if="errors.has(name)" class="help is-danger has-text-centered">{{ errors.first(name) }}</p>
            </slide-fade>
        </div>
    </card>
</template>

<script>
import Card from '../generic/Card.vue';
import SlideFade from '../transitions/SlideFade.vue';

export default {
    props: ['name', 'minVal', 'maxVal', 'toolTip'],

    components: {
        Card, SlideFade
    },

    computed: {
        hasNoErrors() {
            this.valid = !this.errors.has(this.name) && this.value !== '';
            return this.valid;
        }
    },

    watch: {
        valid: function () {
            console.log('the input is now valid.');
            this.$emit('input', this.name, this.value, this.valid);
        }
    },
    data: function () {
        return {
            value: '',
            valid: false
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
