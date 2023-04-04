/*
    Answer object that will be sent to the answer url.
*/
const answerObject = {
  answer: '',
  setAnswer: function (theAnswer) {
    this.answer = theAnswer
  },
  getAnswer: function () {
    return this.answer
  }
}
export {answerObject}
