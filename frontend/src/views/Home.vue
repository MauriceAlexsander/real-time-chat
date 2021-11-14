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

<style scoped>
.chat {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: var(--text-white);
}

.chat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--darker-blue);
  border-radius: 12px;
  padding: 12px;
}

.messages-box {
  height: 480px;
  width: 320px;
  overflow: auto;
}

.messages-box::-webkit-scrollbar {
  -webkit-appearance: none;
  background-color: black;
  width: 5px;
}

.messages-box::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--text-white);
}

form {
  margin-top: 12px;
}
</style>
