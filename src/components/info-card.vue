<template>
    <div class="card">
        <div class="card-content has-text-centered">
            <div class="content">
            <transition name="slide-fade" mode="out-in">
                    <div v-if="!editing">
                        <div v-if="reversed" key="viewing"> 
                            <span v-if="editing">
    
                            </span>
                            {{ name }}{{ value }}
                        </div>
                        <div v-else>
                            {{ value }} {{ name }}
                        </div>
                    </div>
                    
                    <div v-else key="editing">
                        {{ name }}
                        <input v-model.number="currentValue" 
                        v-validate="`required|between:${minVal},${maxVal}`" 
                        :class="{'input': true, 'is-danger': errors.has(name), 'is-success': !errors.has(name) && this.value != '' }" 
                        type="number" 
                        :placeholder="0" :name="name">
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
    props: ['value', 'name', 'reversed', 'minVal', 'maxVal'],

    methods: {

        edit() {
            this.editing = true;
        },

        save(){
            this.editing = false;
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


<style>
    .hidden{
        visibility: hidden;
    }

.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
