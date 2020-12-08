import moment from 'moment'
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
    shiftTimeLimit: moment.duration(2, 'seconds').asMilliseconds() , // as miliseconds
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
    setShiftTimeLimit (state, { duration }) {
      state.shiftTimeLimit = moment.duration(duration).asMilliseconds()
    },
  },
  actions: {
    incrementBy ({ commit }, { amount  = 1 }) {
      commit('increment', { amount })
    },
  },
})