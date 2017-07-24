<template>
    <li>
        <el-row :gutter="20">
            <el-col :span="4">
                <span :class="type">
                    <b-icon v-if="type === 'positive'" icon="add"></b-icon>
                    <b-icon v-else icon="remove"></b-icon>    
                    <span class="valueSpan">
                        {{ value }}
                    </span>
                </span>
            </el-col>
            <el-col :span="16" class="valueName">
                {{ name }}
            </el-col>
            <el-col :span="4">
                <b-icon icon="edit"></b-icon>
                <b-icon icon="delete"></b-icon>
            </el-col>
        </el-row>
        </div>
        </div>
    
    </li>
</template>

<script>
export default {
    props: ['name', 'value', 'index', 'type'],
    computed: {
    }
};
</script>

<style lang="scss" scoped>
li {
    font-size: 1.2rem;
    padding: 10px;
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    &:last-of-type {
        border-top: none;
    }
    &:first-of-type {
        border-bottom: none;
    }
    &:nth-child(2) {
        border-top: 1px solid gainsboro;
    }
}

.valueName {
    border-left: 1px solid gainsboro;
    border-right: 1px solid gainsboro;
}

.valueSpan {
    vertical-align: middle;
}

.positive {
    color: rgb(35, 209, 96);
}
.negative {
    color: rgb(255, 56, 96);
}

.name-value-divider {
    padding: 0 .5rem 0 .5rem;
}
</style>
