import {answerObject} from './answerObject.js'
import {question} from './question.js'
import {sendAnswer} from './sendAnswer.js'
import {timer} from './timer.js'

const index = {

  /*
    Important variables that will be used a lot.
    Initial question since we need it whenever we start the game over.
    Current question since we need to update this.
    Rest variables html parts that will be used a lot in the object.
  */
  initialUrl: 'http://courselab.lnu.se/question/1',
  currentQuestion: '',
  question: document.getElementById('question'),
  nameInput: document.getElementById('username'),
  regularInput: document.getElementById('answer'),
  radioContainer: document.getElementById('radioContainer'),
  button: document.getElementById('answerButton'),
  startButton: document.getElementById('startQuiz'),
  timerSeconds: document.getElementById('timer'),
  aMessage: document.getElementById('message'),
  setMessage: function (message) {
    this.aMessage.innerHTML = message
  },
  setTime: function (seconds) {
    this.timerSeconds.innerHTML = seconds
  },

  /*
    The initial question will be output timer will be output and set currentquestion to initialquestion.
  */
  start: async function () {
    await this.startQuestion(this.initialUrl)
    this.showAll()
  },

  /*
    Set the url that will be needed to answer, update answerObjects answer.
    Send answer to answer url and see if the answer is correct.
    Is it correct update message and update current question, if not just send failure message.
  */
  answerQuestion: async function () {
    const answerURL = this.currentQuestion.nextURL
    // If we have alternatives we check the values of the radiobuttons and set the value as answer
    if (this.currentQuestion.alternatives) {
      const radiobuttons = document.querySelectorAll('.alternative')
      for (const alt of radiobuttons) {
        if (alt.checked) {
          answerObject.setAnswer(alt.value)
          break
        }
      }
      this.hide(this.radioContainer)
    } else {
      answerObject.setAnswer(this.regularInput.value) // If not just set the regular input as answer
    }
    const response = await sendAnswer.postQuestion(answerURL, answerObject.getAnswer()) // Send the answer to get the response
    timer.clearTimer() // Reset timer
    // This is my attempt to see if we have reached the end of the quiz, can't test this.
    // Else show the message in browser and get the next question.
    if (response.next === null) {
      this.aMessage.innerHTML = 'Congratulations ' + this.nameInput.value + '! You have won!'
      return null
    } else if (response.nextURL) {
      this.aMessage.innerHTML = response.message
      const nextQuestion = response.nextURL
      this.startQuestion(nextQuestion)
    } else {
      this.aMessage.innerHTML = response.message // If wrong just output message
    }
  },

  /*
  This method we take the URL and get the question from the json, based on the question we
  create radiobuttons or show input field.
  */
  startQuestion: async function (url) {
    this.currentQuestion = await question.getJson(url)
    if (this.currentQuestion.alternatives) {
      // If there are radiobuttons already created remove them all from the container.
      while (this.radioContainer.childNodes.length > 0) {
        this.radioContainer.removeChild(this.radioContainer.childNodes[0])
      }
      this.hide(this.regularInput)
      // Create all the radiobuttons we need.
      for (const alt of Object.entries(this.currentQuestion.alternatives)) {
        const wrapper = document.createElement('div')
        const label = document.createElement('label')
        label.setAttribute('for', alt[0])
        label.innerText = alt[1]
        const radio = document.createElement('input')
        radio.setAttribute('type', 'radio')
        radio.setAttribute('name', 'choice')
        radio.setAttribute('value', alt[0])
        radio.setAttribute('class', 'alternative')
        wrapper.appendChild(radio)
        wrapper.appendChild(label)
        this.radioContainer.appendChild(wrapper)
      }
      this.show(this.radioContainer)
    } else {
      this.show(this.regularInput)
    }
    this.question.innerHTML = this.currentQuestion.question
    timer.startTimer()
  },

  /*
    Show the element in html.
  */
  show: function (element) {
    element.style.display = 'inline'
  },
  showAll: function () {
    this.question.style.display = 'block'
    this.regularInput.style.display = 'inline-block'
    this.button.style.display = 'block'
  },

  /*
    Hide element in html.
  */
  hide: function (element) {
    element.style.display = 'none'
  },

  /*
    Hide all elements regarding the questions.
  */
  hideAll: function () {
    this.question.style.display = 'none'
    this.regularInput.style.display = 'none'
    this.radioContainer.style.display = 'none'
    this.button.style.display = 'none'
  }
}

/*
    When page load hide some elements in the browser.
    If start quiz button is pressed call the start function to start the quiz.
    If answer button is pressed answer the question.
*/
window.onload = () => {
 index.hideAll()
}
document.getElementById('startQuiz').onclick = () => {
 index.start()
}
document.getElementById('answerButton').onclick = () => {
 index.answerQuestion()
}
export {index}
