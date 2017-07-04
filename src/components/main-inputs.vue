<template>
    <div>
        <el-row justify="center">
            <el-col :span="6" :offset="2">
                <MainInput v-on:input="userInput" name="Rooms" minVal="1" maxVal="10">
                    <div slot="inputDescription"> Number Of Rooms</div>
                </MainInput>
            </el-col>
            <el-col :span="6" :offset="2">
                <MainInput v-on:input="userInput" name="Footage" minVal="1" maxVal="10">
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

    watch: {
        'inputs': function (value) {
            console.log("the input validity changed");
        }
    },

    methods: {
        userInput(inputName, inputValue, valid) {
            console.log(inputName + " " + inputValue + " " + valid);
            this.$set(this.inputs[inputName], 'value', inputValue);
            this.$set(this.inputs[inputName], 'valid', valid);

            this.updateInputProgress()
        },

        updateInputProgress() {
            let inputProgress = 0;
            for (const input of Object.keys(this.inputs)) {
                if (this.inputs[input].valid) {
                    inputProgress += 100 / 3;
                }
            }
        
            this.inputProgress = inputProgress;
        }
    },



    data: function () {
        return {
            inputProgress: 0,
            inputs: {
                'Rooms': {
                    'value': 0,
                    'valid': false
                },

                'Footage': {
                    'value': 0,
                    'valid': false
                },

                'Rent': {
                    'value': 0,
                    'valid': false
                }

            },
        }
    }
}
</script>


<style>
label {
    font-family: 'Lato', sans-serif;
}
</style>