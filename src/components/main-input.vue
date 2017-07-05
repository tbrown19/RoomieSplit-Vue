<template>
    <div class="field main-input">
        <label class="label is-large has-text-centered">
            <slot name="inputDescription"></slot>
        </label>
        <p class="control">
            <input v-model.number="value" v-validate="`required|between:${minVal},${maxVal}`" :class="{'input': true, 'is-danger': errors.has(name), 'is-success': !errors.has(name) && this.value != '' }" type="number" :placeholder="0" :name="name">
        </p>
        <transition name="fade">
            <p v-show="errors.has(name)" class="help is-danger has-text-centered">{{ errors.first(name) }}</p>
        </transition>
    </div>
</template>


<script>
require('vue');
export default {
    props: ['name', 'minVal', 'maxVal'],


    watch: {
        value: function (val) {
            this.checkInput(val);
        }
    },

    methods: {
        checkInput(val) {  
            if (val < this.minVal) {
                this.validInput = false;
                //this.value = this.minVal
            }
            else if (val > this.maxVal) {
                this.validInput = false;
                //this.value = this.maxVal
            }
            else {
                this.validInput = true;
            }
            this.$emit("input", this.name, this.value, this.validInput);
        }
    },

    data: function () {
        return {
            value: "",
            validInput: "",
            count: ""
        }
    }

}
</script>

<style>
label {
    font-family: 'Lato', sans-serif;
}

.help {
    font-size: 1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .7s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
    opacity: 0
}
</style>