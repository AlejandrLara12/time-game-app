import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    players: [
      { name: 'Player 1', color: '#1CA085' },
      { name: 'Player 2', color: '#2980B9' },
    ],
    limitOfPlayers: 16,
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    },
    addPlayer (state, { name, color }) {
      const newPlayer = {
        // id: state.players.length,
        name, color,
      }
      state.players = [ ...state.players, newPlayer]
    },
    removePlayer (state, { index }) {
      state.players = state.players.filter( (p, idx) => idx !== index)
    },
  },
  actions: {
    incrementBy ({ commit }, { amount  = 1 }) {
      commit('increment', { amount })
    },
  },
})