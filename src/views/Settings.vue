<template>
<v-container>
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
          Turns limit
          <b-form-spinbutton 
          v-model="turnsLimit" 
          min="0" max="999" 
          placeholder="∞"
          :formatter-fn="turnsFormatter"
          ></b-form-spinbutton>

          <label for="shiftTimeLimitRange">Turn duration {{ shiftTimeLimit }} form {{ formShiftTimeLimit }}</label>

          <v-row>
            <v-dialog
              ref="dialog"
              v-model="clockModal"
              :return-value.sync="formShiftTimeLimit"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formShiftTimeLimit"
                  label="Shift limit time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="clockModal"
                v-model="formShiftTimeLimit"
                full-width
                ampm-in-title
                format="24hr"
                scrollable
                use-seconds
                @input="handleTimeInput"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="clockModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(formShiftTimeLimit)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-row>

        </b-tab>
      </b-tabs>

      <router-link :to="{ name: 'Game' }" class="mb-3">
        <v-btn
          color="primary"
          rounded
          outlined
        > 
          Ready
          <v-icon
            right
            dark
          >
            mdi-play-circle
          </v-icon>
        </v-btn>
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

</v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import moment from 'moment'

export default {
  name: 'Settings',
  components: {
  },
  data() {
    return {
      formShiftTimeLimit: '00:00:20',
      clockModal: false,
      tabIndex: 1,
      turnsLimit: 0,
    }
  },
  methods: {
    ...mapMutations(['setShiftTimeLimit']),
    turnsFormatter(value) {
      if(value === 0) return '∞'
      return value
    },
    twoDigitsFormatter(value){
      let str = value + ''
      if(str.length == 2) return str
      return `0${str}`
    },
    handleTimeInput(newDuration){
      // console.log('time selected', newDuration)
      const duration = moment.duration(newDuration).asMilliseconds()
      // console.log('duration', duration)
      this.setShiftTimeLimit({ duration })
    },
  },
  mounted() {
    // init from with state

    // 1000ms => '00:00:01'
    const currentDuration = moment.duration(this.shiftTimeLimit)
    const hrs = currentDuration.hours();
    const min = currentDuration.minutes();
    const sec = currentDuration.seconds();

    const formattedTime = `${this.twoDigitsFormatter(hrs)}:${this.twoDigitsFormatter(min)}:${this.twoDigitsFormatter(sec)}`
    console.log('mounted duration', formattedTime)
    this.formShiftTimeLimit = formattedTime
  },
  computed: {
    ...mapState(['shiftTimeLimit']),
  }
}
</script>
