<template>
    <div class="field">
        <label class="label is-large">
            <slot name="inputDescription"></slot>
        </label>
        <p class="control">
            <input v-model="value" 
            v-validate="`required|between:${minVal},${maxVal}`" 
            :class="{'input': true, 'is-danger': errors.has(name) }" 
            type="number"
            min="1" max="10"
            :placeholder="name" :name="name" >
        </p>
        <span v-show="errors.has(name)" class="help is-danger">{{ errors.first(name) }}</span>
    </div>
</template>


<script>
export default {
    props: ['name', 'minVal', 'maxVal'],

    watch: {
        value: function (val) {
            console.log(this.minVal);
            this.checkInput(val);
        }
    },

    methods: {
        checkInput(val){
            this.validInput = true;
            if(val < this.minVal){
                this.validInput = false;
                this.value = this.minVal
            }
            else if(val < this.minVal){
                this.validInput = false;
                this.value = this.minVal
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
</style>