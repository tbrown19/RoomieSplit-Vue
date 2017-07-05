<template>
    <div>
    
        <el-form :inline="true" :model="measurement">
            <el-form-item class="measurement-input">
                <input v-model.number="measurement.feet" v-validate="'required|between:0,100'" :class="{'input': true, 
                            'is-danger': errors.has('feet'), 'is-success': !errors.has('feet') && this.measurement.feet != ''}" type="number" placeholder="ft" name="feet">
            </el-form-item>
    
            <el-form-item class="measurement-input">
                <input v-model.number="measurement.inches" v-validate="'between:0,12'" :class="{'input': true, 
                            'is-danger': errors.has('inches'), 'is-success': !errors.has('inches') && this.measurement.inches != ''}" type="number" placeholder="in" name="inches">
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
export default {
    props: ['scope', 'type'],

    data: function () {
        //Get the current row, and then get the current measurement type either length or width.
        let currentRow = this.scope.row;
        let measurement = currentRow[this.type];
        return {
            currentRow,
            measurement,
            disabled: false
        }
    }
}
</script>


<style scoped>
.measurement-input {
    padding-top: 1rem;
    max-width: 4rem;
}
</style>
