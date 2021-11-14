<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("setClientID")
    this.$store.dispatch("setWebSocket")
  }
}
</script>

<style>
:root {
  --text-white: #fafafafa;
  --dark-blue: #2c3e50;
  --darker-blue: #202a35;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark-blue);
}

#nav {
  padding: 30px;
}

body {
  margin: 0;
  background-color: var(--dark-blue);
}
</style>
