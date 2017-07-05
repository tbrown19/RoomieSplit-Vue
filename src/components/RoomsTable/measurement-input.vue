<template>
    <div>
    
        <el-form :inline="true" :model="measurement">
            <el-form-item>
                <el-input class="measurementInput" size="small" placeholder="Ft" v-model.number="scope.row.footage">
                </el-input>
                <!--<input v-model.number="scope.row.footage" v-validate="'required|between:1,500'" :class="{'input': true, 'is-danger': errors.has('name'), 'is-success': !errors.has('name') && this.feet != '' }" type="number" placeholder="Ft" name="name">-->
            </el-form-item>
            <el-form-item label="Activity zone">
                <!--<input v-model.number="scope.row.footage" v-validate="'required|between:1,500'" :class="{'input': true, 'is-danger': errors.has('name'), 'is-success': !errors.has('name') && this.feet != '' }" type="number" placeholder="Ft" name="name">-->
            </el-form-item>
    
        </el-form>
    </div>
</template>


<script>
export default {
    props: ['scope', 'type'],

    data: function () {
        console.log(this.type)
        return {
            measurement: {
                feet: '',
                inches: ''
            }
        }
    }
}
</script>


<style scoped>
.measurementInput {
    padding-top: 1rem;
    max-width: 4rem !important;
}
</style>
