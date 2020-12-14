<template>
  <div class="game">
    <b-alert :show='reachedShiftTimeLimit' variant="danger">Time is up</b-alert>

    <p>reachedShiftTimeLimit {{ reachedShiftTimeLimit }}</p>
    <div>
      <v-btn rounded @click="handleStart"> 
          <v-icon left dark> mdi-play-circle </v-icon>
          Start
      </v-btn>
      <v-btn rounded @click="handlePause"> 
          <v-icon left dark> mdi-pause-circle </v-icon>
          Pause
      </v-btn>
      <v-btn rounded @click="handleReset"> 
          <v-icon left dark> mdi-skip-previous-circle </v-icon>
          Reset
      </v-btn>
      <v-btn rounded @click="handleNextPlayer"> 
          <v-icon left dark> mdi-skip-next-circle </v-icon>
          Next Player
      </v-btn>
    </div>

    <div>
      <p>active player</p>
      <pre>{{ activePlayer }}</pre>
    </div>

    <CircularProgress
      :strokeColor="activePlayer.color"
      :transitionDuration="100"
      :radius="80"
      :strokeWidth="10"
      :value="percentageOfTimeLeft"
      > 
      <div>next player <br /> {{ percentageOfTimeLeft }}</div>
    </CircularProgress> 

  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

// @ is an alias to /src
import CircularProgress from '@/components/CircularProgress.vue'

import Stopwatch from '@/classes/Stopwatch'

export default {
  name: 'Home',
  components: {
    CircularProgress,
  },
  data() {
    return {
      playerForm: {
        name: '',
        color: '#1CA085',
      },
      currentDuration: 0,
      // percentageOfTimeLeft: 0,
      reachedShiftTimeLimit: false,
      sw: new Stopwatch(),
      timerInterval: null,
    }
  },
  methods: {
    ...mapMutations(['removePlayer', 'nextPlayer']),
    handleStart() {
      this.sw.start()
      this.timerInterval = setInterval(() => {
        // console.log('dur ... ')
        this.currentDuration = this.sw.current
        this.reachedShiftTimeLimit = this.currentDuration > this.shiftTimeLimit
      }, this.INTERVAL_MS)
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
      this.nextPlayer()
      this.sw.reset()
      this.currentDuration = 0
      this.reachedShiftTimeLimit = false
      this.handleStart()
    },
  },
  watch: {
    // 'currentDuration': function(v) {
    //   // console.log('watch', v)
    //   let percentage = v * 100 / this.shiftTimeLimit
    //   console.log('perc .. ', percentage)
    //   percentage = percentage > 100 ? 100 : percentage
    //   // return percentage
    //   this.percentageOfTimeLeft = percentage
    // },
  },
  computed: {
    ...mapState(['limitOfPlayers', 'players', 'shiftTimeLimit', 'INTERVAL_MS']),
    ...mapGetters([
      'activePlayer',
    ]),
    percentageOfTimeLeft() {
      let percentage = this.currentDuration * 100 / this.shiftTimeLimit
      console.log('perc .. ', percentage)
      percentage = percentage > 100 ? 100 : percentage
      return percentage
    },
  }
}
</script>
