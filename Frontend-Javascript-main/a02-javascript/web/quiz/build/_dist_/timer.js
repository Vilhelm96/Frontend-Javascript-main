import {index} from './index.js'
// Object that handles the time in the game.
const timer = {
  seconds: 10,
  interval: '',
  // Function that checks if timer has hit zero, if it has show the message on the browser.
  checkIfZero: function () {
    if (this.seconds === 0) {
      index.setMessage('You have failed try again!')
      return true
    }
    return false
  },
  getTimer: function () {
    return this.seconds
  },
  // Reset timer and clear interval.
  clearTimer: function () {
    clearInterval(this.interval)
    this.seconds = 10
  },
  // Start timer that decrease the timer with 1 every 1000 ms.
  startTimer: function () {
    this.interval = setInterval(() => {
      // If timer reach zero call function cleartimer
      if (this.checkIfZero()) {
        this.clearTimer()
      }
      index.setTime(this.seconds)
      this.seconds -= 1
    }, 1000)
  }
}
export {timer}
