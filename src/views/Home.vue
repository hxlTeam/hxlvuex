<template>
  <div class="home">
    Home
    <br />
    {{this.$store.state.age}}
    <br>
    {{this.$store.getters.myAge}}
    <br>
    <button @click="handleAdd">提交mutations加10</button>
    <br>
    <button @click="handleMinus">提交action减10</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  mounted() {

  },
  methods: {
    handleAdd() {
      this.$store.commit('syncAdd',10);
    },
    handleMinus() {
      this.$store.dispatch('asyncMinus',10);
    }
  }
}
</script>
