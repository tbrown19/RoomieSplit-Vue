<template>
    <div>
        <h2> {{ capitalizedName }} </h2>
        <hr>
        <h4 class="is-spaced"> {{ value }} </h4>
    </div>
</template>

<script>
export default {
    props: ['name', 'value'],

    computed: {
        capitalizedName: function () {
            return this.name.charAt(0).toUpperCase() + this.name.slice(1);
        }
    }
};
</script>


<style scoped>
hr {
    margin: .25rem;
}

h2,
h4 {
    font-weight: 300;
}

h4 {
    font-size: 2rem;
    margin-top: .3em;
    margin-bottom: .15em;
}
</style>

