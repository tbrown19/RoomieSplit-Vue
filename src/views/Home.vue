<template>
    <div>
        <el-row type="flex" justify="center">
            <h2>Calculate a fair way to split the cost of rent.</h2>
        </el-row>
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


<style>
    h2 {
        font-family: "Roboto";
    }
</style>
