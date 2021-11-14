import { createStore } from 'vuex'

export default createStore({
  state: {
    client_id: null,
    websocket: null,
    chat_log: [],
  },
  mutations: {
    setClientID(state) {
      state.client_id = Date.now()
    },
    setWebSocket(state) {
      state.websocket = new WebSocket(`ws://localhost:8000/ws/${state.client_id}`);
      state.websocket.onmessage = function(event) {
        state.chat_log.push(event.data)
      };
    },
    sendMessage(state, text) {
      state.websocket.send(text)
    },
  },
  actions: {
    setClientID(state) {
      state.commit("setClientID")
    },
    setWebSocket(state) {
      state.commit("setWebSocket")
    },
    sendMessage(state, text) {
      state.commit("sendMessage", text)
    },
  },
  getters: {
    client_id: state => state.client_id,
    websocket: state => state.websocket,
    chat_log: state => state.chat_log,
  },
  modules: {
  }
})
