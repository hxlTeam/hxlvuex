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
    <!-- <br>
    {{this.$store.state.a.x}}
    <br>
    {{this.$store.state.b.y}} -->
    <br>
    {{this.$store.getters.getA}}
    <br>
    {{this.$store.state.a.x}}
    <button @click="changeX">更新x</button>
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
    },
    changeX() {
      this.$store.commit('changeX');
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
