<template>
  <div class="home">
    Home
    <br />
    {{this.$store.state.age}}
    <br />
    {{this.$store.getters.myAge}}
    <br />
    <button @click="handleAdd">commit add 10</button>
    <br />
    <button @click="handleMinus">dispatch Minus 10</button>
    <br />
    {{this.$store.getters.getA}}
    <br />
    {{this.$store.state.a.x}}
    <br />
    <button @click="changeX">x+1</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    handleAdd() {
      this.$store.commit("syncAdd", 10);
    },
    handleMinus() {
      this.$store.dispatch("asyncMinus", 10);
    },
    changeX() {
      this.$store.commit('changeX');
    }
  }
};
</script>
