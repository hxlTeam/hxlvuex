<template>
  <div class="home">
    Home
    <br>
    {{this.$store.state.age}}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  mounted() {
    // console.log(this.$store);
  }
}
</script>
