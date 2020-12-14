<template>
  <v-container>
    <div class="game">
      <b-alert :show='reachedShiftTimeLimit' variant="danger">Time is up</b-alert>

      <p>reachedShiftTimeLimit {{ reachedShiftTimeLimit }}</p>
      <div class="mb-3">
        <v-row>
          <v-col cols="6">
            <v-btn rounded @click="handleToggleTime" depressed block > 
                <v-icon left dark> {{ this.sw.is_running ? 'mdi-pause-circle' : 'mdi-play-circle' }} </v-icon>
                {{ this.sw.is_running ? 'Pause' : 'Start' }}
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn rounded @click="handleReset" depressed block> 
                <v-icon left dark> mdi-skip-previous-circle </v-icon>
                Reset
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- <div>
        <p>active player</p>
        <pre>{{ activePlayer }}</pre>
      </div> -->

      <CircularProgress
        :strokeColor="activePlayer.color"
        :transitionDuration="100"
        :radius="80"
        :strokeWidth="15"
        :value="percentageOfTimeLeft"
        > 
        <!-- <div>next player <br /> {{ percentageOfTimeLeft }}</div> -->
        <p></p>
      </CircularProgress> 

      <div class="mt-5">
        <v-btn :color="activePlayer.color" rounded @click="handleNextPlayer" block x-large text-color="white"> 
            <v-icon left color="white"> mdi-skip-next-circle </v-icon>
            <span style="color: white;">Next Player</span>
        </v-btn>
      </div>

    </div>

  </v-container>
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
    handleToggleTime(){
      if(this.sw.is_running){
        this.handlePause()
      } else {
        this.handleStart()
      }
    }
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
