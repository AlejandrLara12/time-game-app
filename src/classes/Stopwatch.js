import moment from 'moment'

class Stopwatch {
    constructor() {
        this.duration = 0
        this.started_at = 0
        this.stopped_at = 0
        this.is_running = false
    }
    get current() {
        if(this.is_running) {
            return this.duration + moment().diff(this.started_at)
        }
        return this.duration
    }
    start() {
        if(this.is_running) return;

        this.is_running = true
        this.started_at = moment()
    }
    stop() {
        if(!this.is_running) return;
            
        // get diff in miliseconds
        this.stopped_at = moment()
        this.duration += this.stopped_at.diff(this.started_at)
        // console.log('duration ...', this.duration)

        this.is_running = false
    }
    reset() {
      this.duration = 0
      this.is_running = false
    }
}

export default Stopwatch