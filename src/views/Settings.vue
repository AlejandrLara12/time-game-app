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
          Turn duration
          <b-form-spinbutton 
          v-model="turnsLimit" 
          min="0" max="999" 
          placeholder="∞"
          :formatter-fn="turnsFormatter"
          ></b-form-spinbutton>

          <label for="shiftTimeLimitRange">Turn duration {{ shiftTimeLimit }} form {{ formShiftTimeLimit }}</label>

          <p>current time {{ time }}</p>
          
          <v-row>
            <v-col
              cols="11"
              sm="5"
            >
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    label="Picker in dialog"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="modal2"
                  v-model="time"
                  full-width
                  ampm-in-title
                  format="24hr"
                  scrollable
                  use-seconds
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="modal2 = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(time)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>

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

</v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Settings',
  components: {
  },
  data() {
    return {
      time: '00:00:20',
      menu2: false,
      modal2: false,
      tabIndex: 1,
      formShiftTimeLimit: 0,
      turnsLimit: 0,
    }
  },
  methods: {
    ...mapMutations(['setShiftTimeLimit']),
    turnsFormatter(value) {
      if(value === 0) return '∞'
      return value
    },
    timeFormatter(value){
      let str = value + ''
      if(str.length == 2) return str
      return `0${str}`
    },
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
