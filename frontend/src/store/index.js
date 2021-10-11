import { createStore } from 'vuex'

export default createStore({
  state: {
    client_id: null,
    webSocket: null,
  },
  mutations: {
    setClientID(state) {
      state.client_id = Date.now()
    },
    setWebSocket(state) {
      state.webSocket = new WebSocket(`ws://localhost:8000/ws/${state.client_id}`);
      state.webSocket.onmessage = function(event) {
          var messages = document.getElementById('messages')
          var message = document.createElement('li')
          var content = document.createTextNode(event.data)
          message.appendChild(content)
          messages.appendChild(message)
      };
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
  },
  modules: {
  }
})
