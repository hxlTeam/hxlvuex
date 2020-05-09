<template>
  <div class="home">
    Home
    <br />
    age: {{this.$store.state.age}}
    <br />
    myAge: {{this.$store.getters.myAge}}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  mounted() {
    // console.log(this.$store);
    setTimeout(() => {
      this.$store.state.age = 100;
    }, 1000);
  }
};
</script>
