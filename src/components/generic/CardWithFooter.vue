<template>
    <div class="card">
        <div class="card-content has-text-centered">
            <div class="content">
                <slot name="content">
    
                </slot>
            </div>
        </div>
        <slot name="footer"></slot>
    
    </div>
</template>


<script>
export default {
};
</script>

<style scoped>
.card-content {
    padding: .75rem;
}
</style>
