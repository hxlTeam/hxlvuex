<template>
  <div class="home">
    Home
    <br />
    age: {{this.$store.state.age}}
    <br />
    myAge: {{this.$store.getters.myAge}}
    <br />
    <button @click="handleAdd">提交mutations增加10</button>
    <br />
    <button @click="handleMinus">提交actions减少10</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    handleAdd() {
      this.$store.commit('syncAdd',10)
    },
    handleMinus() {
      this.$store.dispatch('asyncMinus',10)
    }
  },
  mounted() {
    // console.log(this.$store);
    setTimeout(() => {
      this.$store.state.age = 100;
    }, 1000);
  }
};
</script>
