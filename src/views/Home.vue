<template>
  <div class="home">
    <b-alert :show='reachedShiftTimeLimit' variant="danger">Time is up</b-alert>
    <p>shiftTimeLimit {{ shiftTimeLimit }} ms</p>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->

    <PlayersForm />
    <p>reachedShiftTimeLimit {{ reachedShiftTimeLimit }}</p>
    <p>duration: {{currentDuration}} ms</p>
    <b-button @click="handleStart">Start</b-button>
    <b-button @click="handlePause">Pause</b-button>
    <b-button @click="handleReset">Reset</b-button>
    <b-button @click="handleNextPlayer">Next Player</b-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import Landing from "./components/Landing";

// @ is an alias to /src
import PlayersForm from '@/components/PlayersForm.vue'
import Stopwatch from '@/classes/Stopwatch'

export default {
  name: 'Home',
  components: {
    PlayersForm
  },
  data() {
    return {
      playerForm: {
        name: '',
        color: '#1CA085',
      },
      currentDuration: 0,
      reachedShiftTimeLimit: false,
      sw: new Stopwatch(),
      timerInterval: null,
    }
  },
  methods: {
    ...mapMutations(['addPlayer', 'removePlayer']),
    handleStart() {
      this.sw.start()
      this.timerInterval = setInterval(() => {
        // console.log('dur ... ')
        this.currentDuration = this.sw.current
        this.reachedShiftTimeLimit = this.currentDuration > this.shiftTimeLimit
      }, 100)
    },
    handlePause() {
      this.sw.stop()
      clearInterval(this.timerInterval)
    },
    handleReset() {
      this.sw.reset()
      this.currentDuration = 0
      this.reachedShiftTimeLimit = false
      clearInterval(this.timerInterval)
    },
    handleNextPlayer() {
      if(!this.sw.is_running){
        alert('must start the game first')
        // this.$bvToast.toast(`Toast ${this.counter} body content`, {
        //   title: `Toaster ${toaster}`,
        //   toaster: toaster,
        //   solid: true,
        //   appendToast: append
        // })
        return
      }
      this.sw.reset()
      this.currentDuration = 0
      this.reachedShiftTimeLimit = false
      this.handleStart()
    },
  },
  // watch: {
  //   'sw.current': function(v) {
  //     console.log('watch', v)
  //   }
  // },
  computed: {
    ...mapState(['limitOfPlayers', 'players', 'shiftTimeLimit']),
  }
}
</script>
