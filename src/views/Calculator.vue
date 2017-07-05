<template>
  <div>
      inputs and such!!
      {{ housingInformation }}
    <div class="field">
      <label class="label">Username</label>
      <p class="control has-icons-left has-icons-right">
        <input class="input is-success" type="text" placeholder="Text input" value="bulma">
        <span class="icon is-small is-left">
          <i class="fa fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fa fa-check"></i>
        </span>
      </p>
      <p class="help is-success">This username is available</p>
    </div>
  </div>
</template>


<script>
export default {
    data: function () {
        return {
            housingInformation: this.$store.state .housingInformation
        }
    }
}
</script>
