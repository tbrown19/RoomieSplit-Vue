<template>
    <li>
        {{ name }} - {{ value }} - {{ index }}
    </li>
</template>

<script>
export default {
    props: ['name', 'value', 'index']
};
</script>

<style>

</style>
