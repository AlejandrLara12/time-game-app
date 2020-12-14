<template>
  <div class="home">
    <b-alert :show='reachedShiftTimeLimit' variant="danger">Time is up</b-alert>
    <p>shiftTimeLimit {{ shiftTimeLimit }} ms</p>
    <PlayersForm />
    <router-link :to="{ name: 'Settings' }">
      <v-btn
        color="primary"
        rounded
        outlined
        elevation="2"
      > 
        Continue 
        <v-icon
          right
          dark
        >
          mdi-arrow-right-circle-outline
        </v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

// @ is an alias to /src
import PlayersForm from '@/components/PlayersForm.vue'

import Stopwatch from '@/classes/Stopwatch'

export default {
  name: 'Home',
  components: {
    PlayersForm,
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
