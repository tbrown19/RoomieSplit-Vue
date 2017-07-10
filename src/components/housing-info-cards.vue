<template>
    <div>
        <el-card class="box-card">
            {{ housingInformation }}
        </el-card>
    </div>
</template>


<script>
export default {
    props: ['housingInformation'],
}
</script>
