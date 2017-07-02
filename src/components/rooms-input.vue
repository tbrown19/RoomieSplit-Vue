<template>
    <div>
        <h2>Number of rooms:</h2>
        <el-input v-validate data-vv-name="count" v-model="count" v-validate="'required|between:0,1'" type="number" name="count"></el-input>
        <!--<input v-model.number="count" v-validate="'required|between:0,1'" type="number" name="count">-->
        <span v-show="errors.has('count')">{{ errors.first('count') }}</span>
        <p>Message is: {{ count }}</p>
    </div>
</template>


<script>
export default {



    data: function () {
        return {
            count: 0
        }
    }

}
</script>
