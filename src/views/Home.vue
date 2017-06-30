<template>
    <div>
        <input v-model="count" :keyDown="checkInput()" placeholder="0" type="number" min="1" max="100" maxlength="2">
        <p>Message is: {{ count }}</p>
        <div>
            <span v-for="n in intInput" :key='n'>{{ n }} </span>
        </div>
    </div>
</template>


<script>
export default {

    methods : {

        checkInput: function() {
            if (this.count > 10){
                this.count = 10;
            }
        }
    },

    computed: {
        intInput: function() {
            if (this.count == ""){
                return 0;
            }
            return parseInt(this.count);
        }
    },

    data: function () {
        return {
            count: 0
        }
    }
}
</script>
