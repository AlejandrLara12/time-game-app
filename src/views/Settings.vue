<template>
  <div class="settings">
    <h1>This is an Settings page</h1>
    
    <b-card no-body>
      <b-tabs v-model="tabIndex" small card>
        <b-tab title="Type">
          <b-card no-body class="overflow-hidden" style="">
            <div class="d-flex flex-row">
              <b-card-img src="https://picsum.photos/400/400/?image=20" style="max-width: 80px;" alt="Image" class="rounded-0"></b-card-img>
              <b-card-body title="Turn Time Limit" >
                <b-card-text>Each player has a limited amout of time every turn</b-card-text>
              </b-card-body>
            </div>
          </b-card>
        </b-tab>
        <b-tab title="Custom settings">
          Turn duration
          <b-card>
            <b-form-input
              id="example-input"
              type="text"
              placeholder="HH:mm:ss"
            ></b-form-input>
          </b-card>

          <label for="shiftTimeLimitRange">Turn duration {{ shiftTimeLimit }} form {{ formShiftTimeLimit }}</label>
          <b-form-input id="shiftTimeLimitRange" v-model="formShiftTimeLimit" type="range" step="1" min="0" max="1200"></b-form-input>
        </b-tab>
      </b-tabs>

      <router-link class="mb-3" :to="{ name: 'Game' }">
        <b-button class="">
          Start
          <b-icon class="ml-2" icon="arrow-right-circle-fill" aria-hidden="true"></b-icon>
        </b-button>
      </router-link>
    </b-card>

    <!-- Control buttons-->
    <!-- <div class="text-center">
      <b-button-group class="mt-2">
        <b-button @click="tabIndex--">Previous</b-button>
        <b-button @click="tabIndex++">Next</b-button>
      </b-button-group>
    </div> -->

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Settings',
  components: {
  },
  data() {
    return {
      tabIndex: 1,
      formShiftTimeLimit: 0,
    }
  },
  methods: {
    ...mapMutations(['setShiftTimeLimit']),
  },
  watch: {
    formShiftTimeLimit(v) {
      console.log('new duration', v)
      this.setShiftTimeLimit({ duration: v * 1000 })
    }
  },
  mounted() {
    // init from with state
    this.formShiftTimeLimit = this.shiftTimeLimit / 1000
  },
  computed: {
    ...mapState(['shiftTimeLimit']),
  }
}
</script>
