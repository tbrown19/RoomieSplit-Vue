<template>
    <div>
        <p class="inputDescription">
            <div v-if="currentValues">
                <transition-group name="values-list" class="values-list-group" tag="ul">
                    <li is="list-item" v-for="(value, key, index) in currentValues" v-bind:key="key" :name="key" :value="value" :index="index" :type="type" class='list-item' @removeValue="removeValue">
                    </li>
                </transition-group>
            </div>
            <div v-else>
                Currently no additonal values. You can add one below!
            </div>
        </p>
    </div>
</template>


<script>
import ListItem from './ListItem';
export default {
    props: ['currentValues', 'type'],
    components: {
        ListItem
    },
    methods: {
        removeValue(name) {
            this.$emit('removeValue', name);
        }
    }
};
</script>

<style>
.values-list-group {
    border: 1px solid gainsboro;
    border-radius: 5px;
    padding: 1rem;
}



/* .values-list-move {
    transition: 1s;
} */

.list-item {
    margin-right: 10px;
}

.values-list-enter-active,
.values-list-leave-active {
    transition: all 1s;
}

.values-list-enter,
.values-list-leave-to
/* .list-leave-active below version 2.1.8 */

{
    opacity: 0;
    transform: translateY(30px);
}
</style>
