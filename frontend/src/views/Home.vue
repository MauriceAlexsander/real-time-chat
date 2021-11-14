<template>
  <div class="chat">
    <div class="chat-box">
      <h1>Global Chat</h1>
      <h2>Your ID: {{ID}}</h2>
      <div ref='messages' class="messages-box">
        <ul style="list-style-type: none; padding-left: 12px; margin: 0;">
          <Message v-for="message in chat_log" v-bind:key="message.id" v-bind:message="message" />
        </ul>
      </div>
      <form @submit.prevent="send_message()">
          <input required v-model="text" type="text" id="messageText" autocomplete="off"/>
          <button type='submit'>Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "./../components/Message.vue";
import { mapGetters } from 'vuex'

export default {
  name: "Home",
  beforeRouteEnter(to, from, next){
    to.meta.title = "Início";
    document.title = to.meta.title;
    next();
  },
  data() {
    return {
      text: ""
    }
  },
  components: {
    Message,
  },
  methods: {
    async send_message() {
      this.$store.dispatch("sendMessage", this.text)
      this.text = ""
      this.scroll_to_bottom()
    },
    async scroll_to_bottom() {
      await new Promise(r => setTimeout(r, 10));
      const messages = this.$refs.messages
      messages.scrollTop = messages.scrollHeight
    },
  },
  computed: {
    ...mapGetters({
      chat_log: 'chat_log',
      ID: 'client_id',
    }),
  },
  watch: {
    '$store.state.chat_log': {
      deep: true,
      handler() {
        const messages = this.$refs.messages
        if (messages.scrollTop + 480 === messages.scrollHeight) {
          this.scroll_to_bottom();
        }
      },
    },
  },
}
</script>

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
