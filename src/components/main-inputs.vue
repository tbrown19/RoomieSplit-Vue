<template>
    <div>
        <el-row justify="center">
            <el-col :span="6" :offset="2">
                <MainInput v-on:input="inputSuccess" name="Rooms" minVal="1" maxVal="10">
                    <div slot="inputDescription"> Number Of Rooms</div>
                </MainInput>
            </el-col>
            <el-col :span="6" :offset="2">
                <MainInput v-on:inputSuccess="inputSuccess('footage')" name="Footage" minVal="1" maxVal="10">
                    <div slot="inputDescription"> Total Square Footage</div>
                </MainInput>
            </el-col>
        </el-row>
        <hr>
        <progress class="progress is-primary" :value="inputProgress" max="100">30%</progress>
    </div>
</template>

<script>
import MainInput from './main-input.vue';
export default {
    components: {
        MainInput
    },

    methods: {
        inputSuccess(inputName, inputValue, success){
            this.inputProgress += 100/3;
            console.log(inputName  + " " + inputValue  + " " + success);
        }
    },

    data: function () {
        return {
            inputProgress: 0,
            rooms: "",
            count: 1
        }
    }
}
</script>


<style>
label {
    font-family: 'Lato', sans-serif;
}
</style>