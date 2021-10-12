import { createStore } from 'vuex'

export default createStore({
  state: {
    client_id: null,
    webSocket: null,
    chat_log: [],
  },
  mutations: {
    setClientID(state) {
      state.client_id = Date.now()
    },
    setWebSocket(state) {
      state.webSocket = new WebSocket(`ws://localhost:8000/ws/${state.client_id}`);
      state.webSocket.onmessage = function(event) {
          state.commit("setChatLog", event.data) 
      };
    },
    setChatLog(state, message) {
      state.chat_log.push(message)
    }
  },
  actions: {
    setClientID(state) {
      state.commit("setClientID")
    },
    setWebSocket(state) {
      state.commit("setWebSocket")
    }
  },
  getters: {
    getClientID: state => state.client_id,
    getWebSocket: state => state.webSocket,
    getChatLog: state => state.chat_log,
  },
  modules: {
  }
})
