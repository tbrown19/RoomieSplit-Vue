<template>
    <div class="card">
        <div class="card-content has-text-centered">
            <div class="content">
                {{ value }} {{ name }}
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item">Edit</a>
        </footer>
    </div>
</template>


<script>
export default {
    props: ['value', 'name']
}

</script>