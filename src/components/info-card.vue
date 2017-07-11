<template>
    <div class="card">
        <div class="card-content has-text-centered">
            <div class="content">
                <transition name="slide-fade" mode="out-in">
                    <div v-if="!editing">
                        <slot name="name"></slot>
                        <hr> {{ currentValue }}
                    </div>
    
                    <div v-else key="editing">
                        <slot name="name"></slot>
                        <hr class="hidden">
                        <input v-model.number="currentValue" v-validate="`required|between:${minVal},${maxVal}`" :class="{'input': true, 'is-danger': errors.has(name), 'is-primary': !errors.has(name) && this.value != '' }" type="number" :placeholder="0" :name="name">
                    </div>
                </transition>
    
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" @click="edit" v-if="!editing">Edit</a>
            <a class="card-footer-item" @click="save" v-else :class="{'hidden': errors.has(name)}">Save</a>
        </footer>
    </div>
</template>


<script>
export default {
    props: ['value', 'name', 'minVal', 'maxVal'],
    methods: {
        edit() {
            this.editing = true;
        },

        save() {
            this.editing = false;
            this.$emit("validInput", this.name, this.currentValue)
        }
    },

    data: function () {
        return {
            currentValue: this.value,
            editing: false
        }
    }
}

</script>


<style scoped>
.hidden {
    visibility: hidden;
}

hr {
    margin: .5rem 0;
}

.card-content {
    padding: .75rem;
}

.input {
    max-width: 75%;
}

.slide-fade-enter-active {
    transition: all .2s ease;
}

.slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */

{
    transform: translateY(10px);
    opacity: 0;
}
</style>
