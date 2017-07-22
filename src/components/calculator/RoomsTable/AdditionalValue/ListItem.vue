<template>
    <li>
        <div class="level">
            <div class="level-left">
                {{ name }}
                <span></span>{{ value }}
            </div>
            <div class="level-right">
                <b-icon icon="edit"></b-icon>
                <b-icon icon="delete"></b-icon>
            </div>
        </div>
    
    </li>
</template>

<script>
export default {
    props: ['name', 'value', 'index']
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
}
</style>
