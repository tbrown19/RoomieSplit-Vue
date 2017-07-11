<template>
    <div class="card">
        <div class="card-content has-text-centered">
            <div class="content">
                <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content" class="has-text-centered input-tool-tip">
                        <slot name="toolTip">

                        </slot>
                        Value can be between {{ minVal }} and {{ maxVal }}
                    </div>
                    <slot name="inputDescription"></slot>
                </el-tooltip>
                <hr>
                <input v-model.number="value" v-validate="`required|between:${minVal},${maxVal}`" :class="{'input': true, 'is-danger': errors.has(name), 'is-success': !errors.has(name) && this.value != '' }" type="number" :placeholder="0" :name="name">
                <transition name="slide-fade">
                    <p v-if="errors.has(name)" class="help is-danger has-text-centered">{{ errors.first(name) }}</p>
                </transition>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['name', 'minVal', 'maxVal', 'toolTip'],


    watch: {
        value: function (val) {
            this.checkInput(val);
        }
    },

    methods: {
        checkInput(val) {
            if (val < this.minVal) {
                this.validInput = false;
            }
            else if (val > this.maxVal) {
                this.validInput = false;
            }
            else {
                this.validInput = true;
            }
            this.$emit("input", this.name, this.value, this.validInput);
        },
    },

    data: function () {
        return {
            value: "",
            validInput: "",
            count: "",
        }
    }

}
</script>

<style>
label {
    font-family: 'Lato', sans-serif;
}

.card-content {
    padding: 1.25rem;
}

.input {
    max-width: 85%;
}

.help {
    font-size: 1rem;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */

{
    transform: translateY(10px);
    opacity: 0;
}


.input-tool-tip{
    padding: .5rem;
    font-size: 1.2rem;
}
</style>