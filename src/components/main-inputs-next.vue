<template>
    <el-collapse-transition>
        <div v-show='visible'>
            <el-row type="flex" justify="center">
                <button v-on:click='click()' class="button is-primary is-large">Next Step</button>
            </el-row>
        </div>
    </el-collapse-transition>
</template>


<script>
export default {
  props: ['visible'],

  methods: {
      click() {
        this.$router.push('Calculator');
        //this.$emit('click');
      }
  }
}
</script>
