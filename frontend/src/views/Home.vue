<template>
  <div>
    <h1>WebSocket Chat</h1>
    <h2>Your ID: {{ID}}</h2>
    <form @submit.prevent="sendMessage()">
        <input required v-model="message" type="text" id="messageText" autocomplete="off"/>
        <button type='submit'>Send</button>
    </form>
    <ul id='messages'>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  beforeRouteEnter(to, from, next){
    to.meta.title = "Início";
    document.title = to.meta.title;
    next();
  },
  data() {
    return {
      message: ""
    }
  },
  methods: {
    sendMessage() {
      this.WebSocket.send(this.message)
      this.message = ""
    }
  },
  computed: {
    ID() {
      return this.$store.getters.getClientID
    },
    WebSocket() {
      return this.$store.getters.getWebSocket
    }
  }
}
</script>
