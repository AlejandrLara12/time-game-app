import moment from 'moment'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    players: [
      { name: 'Player 1', color: '#F39C19' },
      { name: 'Player 2', color: '#2980B9' },
      { name: 'Player 3', color: '#e8375a' },
    ],
    limitOfPlayers: 16,
    currentPlayer: 0,
    shiftTimeLimit: moment.duration(60, 'seconds').asMilliseconds() , // as miliseconds
    INTERVAL_MS: 100,
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
    setCurrentPlayer (state, { currentPlayer }) {
      state.currentPlayer = currentPlayer
    },
    nextPlayer(state) {
      let nextPlayerIndex = state.currentPlayer + 1
      state.currentPlayer = nextPlayerIndex < state.players.length ? nextPlayerIndex : 0
    },
  },
  actions: {
    incrementBy ({ commit }, { amount  = 1 }) {
      commit('increment', { amount })
    },
  },
  getters: {
    activePlayer: state => {
      return state.players[state.currentPlayer] || null
    }
  }
})