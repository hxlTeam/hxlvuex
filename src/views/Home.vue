<template>
  <div class="home">
    {{$store.state.count}}
    <br>
    {{$store.getters.tenCount}}
    <br>
    <button @click="add">同步增加</button>
    <br>
    <button @click="minus">异步减少</button>
    <br>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    add() {
      this.$store.commit("syncAdd", 2);
    },
    minus() {
      this.$store.dispatch('asyncMinus',3);
    }
  },
  mounted() {
    // console.log(this.$store);
    // setTimeout(() => {
    //   // console.log(this.$store.state);
    //   this.$store.state.count--;
    // }, 1000);
  }
};
</script>
