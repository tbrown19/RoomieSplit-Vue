<template>
    <el-row justify="center">
        <el-col :span="6" :offset="2">
            <div class="field">
                <label class="label is-large">Username</label>
                <p class="control has-icons-left has-icons-right">
                    <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                </p>
                <p class="help is-success">This username is available</p>
            </div>
        </el-col>
        <el-col :span="6" :offset="2">
            <h2>Total Square Footage:</h2>
            <el-input v-validate data-vv-name="count" v-model="count" v-validate="'required|between:0,1'" type="number" name="count" max-length:1></el-input>
            <!--<input v-model.number="count" v-validate="'required|between:0,1'" type="number" name="count">-->
            <span v-show="errors.has('count')">{{ errors.first('count') }}</span>
            <p>Message is: {{ count }}</p>
        </el-col>
        <el-col :span="6" :offset="2">
            <h2>Rent:</h2>
            <el-input v-validate data-vv-name="count" v-model="count" v-validate="'required|between:0,1'" type="number" name="count"></el-input>
            <!--<input v-model.number="count" v-validate="'required|between:0,1'" type="number" name="count">-->
            <span v-show="errors.has('count')">{{ errors.first('count') }}</span>
            <p>Message is: {{ count }}</p>
        </el-col>
    </el-row>
</template>

<script>
export default {
    watch: {
        rooms: function (val) {
            if (this.rooms > 10) {
                this.rooms = 10;
            }
            console.log(val)
        }
    },

    methods: {

    },

    data: function () {
        return {
            rooms: "",
            count: 1,
        }
    }
}
</script>


<style>

</style>