<template>
  <div class="game">
    <b-alert :show='reachedShiftTimeLimit' variant="danger">Time is up</b-alert>
    <p>shiftTimeLimit {{ shiftTimeLimit }} ms</p>

    <p>reachedShiftTimeLimit {{ reachedShiftTimeLimit }}</p>
    <p>duration: {{currentDuration}} ms</p>
    <div>
      <b-button class="mb-2 mx-1" @click="handleStart"><b-icon class="mr-1" icon="play-fill" aria-hidden="true"></b-icon> Start</b-button>
      <b-button class="mb-2 mx-1" @click="handlePause"><b-icon class="mr-1" icon="pause-fill" aria-hidden="true"></b-icon>Pause</b-button>
      <b-button class="mb-2 mx-1" @click="handleReset"><b-icon class="mr-1" icon="arrow-counterclockwise" aria-hidden="true"></b-icon>Reset</b-button>
      <b-button class="mb-2 mx-1" @click="handleNextPlayer"><b-icon class="mr-1" icon="arrow-right-circle-fill" aria-hidden="true"></b-icon>Next Player</b-button>
    </div>

    <CircularProgress
      strokeColor="#FF00AA"
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
import { mapState, mapMutations } from 'vuex'

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
    ...mapMutations(['addPlayer', 'removePlayer']),
    handleStart() {
      const INTERVAL_MS = 100
      this.sw.start()
      this.timerInterval = setInterval(() => {
        // console.log('dur ... ')
        this.currentDuration = this.sw.current
        this.reachedShiftTimeLimit = this.currentDuration > this.shiftTimeLimit
      }, INTERVAL_MS)
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
    ...mapState(['limitOfPlayers', 'players', 'shiftTimeLimit']),
    percentageOfTimeLeft() {
      let percentage = this.currentDuration * 100 / this.shiftTimeLimit
      console.log('perc .. ', percentage)
      percentage = percentage > 100 ? 100 : percentage
      return percentage
    },
  }
}
</script>
