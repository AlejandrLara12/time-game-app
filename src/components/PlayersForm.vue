<template>
  <div class="players-form-wrap">
    <!-- <p class="mt-2">Value: {{ players }}</p> -->

    <div>
      <ul
        id="my-custom-tags-list"
        class="list-unstyled d-inline-flex flex-wrap mb-2 w-100"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions removals"
      >
        <!-- Always use the tag value as the :key, not the index! -->
        <!-- Otherwise screen readers will not read the tag
              additions and removals correctly -->
        <v-chip
          v-for="(player, index) in players"
          :key="index"
          class="ma-2"
          close
          :color="player.color"
          text-color="white"
          @click:close="handleRemovePlayer(index)"
        >
          {{ player.name }}
        </v-chip>
      </ul>

      <div class="d-flex flex-row">
        <input
          v-model="playerForm.name"
          placeholder="Add player ..."
          @keypress.enter="handleAddPlayer"
          class="form-control m-0 p-0 mr-2" />
        <VSwatches class="mr-2" v-model="playerForm.color"></VSwatches>
        <b-button @click="handleAddPlayer" class="btn-sm" variant="primary">
          <b-icon icon="plus"></b-icon>
        </b-button>
      </div>
    </div>
    <!-- <Landing msg="Hello Vue in CodeSandbox!"/> -->

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VSwatches from 'vue-swatches'

export default {
  name: "PlayersForm",
  components: {
    VSwatches,
  },
  data() {
    return {
      playerForm: {
        name: '',
        color: '#1CA085',
      }
    }
  },
  methods: {
    handleAddPlayer() {
      const playerToAdd = {
        name: this.playerForm.name.trim(),
        color: this.playerForm.color,
      }
      if(!this.playerForm.name) {
        alert('Player name is required')
        return
      }
      this.addPlayer(playerToAdd)
      this.playerForm.name = ''
      this.playerForm.color = `#${Math.floor(Math.random()*16777215).toString(16)}`
    },
    handleRemovePlayer(index) {
      // console.log('handle remove player ...')
      this.removePlayer({ index })
    },
    ...mapMutations(['addPlayer', 'removePlayer'])
  },
  watch: {
  },
  computed: {
    ...mapState(['limitOfPlayers', 'players'])
  }
};
</script>

<style lang='scss'>

.user-card { 
  color: white;
  button svg {
    color: white;
    opacity: 0.7
  }
}
.player-name-cap {
  text-transform: capitalize;
}
</style>
