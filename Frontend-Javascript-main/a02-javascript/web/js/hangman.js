// Hangman object which has all the functions which makes the game work.
const hangman = {
  // Checks if the character is included in the word.
  checkLetter: function (guessedLetter, randomWord) {
    if (randomWord.includes(guessedLetter)) {
      return true
    }

    return false
  },

  // Update the word and reset the values.
  updateWord: function () {
    const randomNumber = hangman.getRandomNumber()
    hangman.getRandomWord(randomNumber)
    theWord.reset()
    theHangmanPicture.hideAll()
  },

  // Random number 0-19.
  getRandomNumber: function () {
    return Math.floor(Math.random() * 20)
  },

  // Takes our current guess and returns it to a string.
  arrayToString: function (currentGuess) {
    let guessToString = ''

    for (var counter = 0; counter < currentGuess.length; counter++) {
      guessToString += currentGuess[counter]
    }

    return guessToString
  },

  // Checks if the game is complete.
  gameComplete: function (currentGuess, randomWord) {
    const currentGuessToString = hangman.arrayToString(currentGuess)

    if (currentGuessToString === randomWord) {
      return true
    }

    return false
  },

  // Checks if user already has guessed on the letter.
  checkIfGuessed: function (guessedLetter, guessedLetterArray) {
    return guessedLetterArray.includes(guessedLetter)
  },

  // Returns a random word for the hangman game.
  getRandomWord: function (randomNumber) {
    const randomWords = ['convince', 'concept', 'apple', 'glory', 'orbit', 'tasty', 'shelter',
      'torture', 'biscuit', 'feature', 'bottom', 'basic', 'accent', 'colon', 'poem', 'impact',
      'waiter', 'navy', 'service', 'final']

    theWord.setUnchangedWord(randomWords[randomNumber])
    theWord.setWord(theWord.getUnchangedWord())
  },

  /*
          Finds out the indexes of where the character appears in the string. I use include as the condition
          for the while loop so that it continues until the character no longer is in the string. Inside the if
          statement I first find out the index of the first occurance of the character using indexOf and then I replace
          that occurance with a empty space " " using replace(). By repeating this I will be able to find out all
          indexes in the string.
      */
  indexesOfGuessedLetter: function (guessedLetter, randomWord) {
    const indexArray = []
    let counter = 0
    let newString = randomWord

    while (newString.includes(guessedLetter)) {
      indexArray[counter++] = newString.indexOf(guessedLetter)
      newString = newString.replace(guessedLetter, ' ')
    }

    theWord.setWord(newString)
    return indexArray
  }
}

// The word object which contains the word and the values we need for the hangman game.
const theWord =
{
  unchangedWord: '',
  aWord: '',
  guessedLetters: [],
  currentWord: [],

  getUnchangedWord: function () {
    return this.unchangedWord
  },

  getWord: function () {
    return this.aWord
  },

  getGuessedLetters: function () {
    return this.guessedLetters
  },

  getCurrentWord: function () {
    return this.currentWord
  },

  setUnchangedWord: function (randomWord) {
    this.unchangedWord = randomWord
  },

  setWord: function (newWord) {
    this.aWord = newWord
  },

  setGuessedLetters: function (guessedLetters) {
    this.guessedLetters = guessedLetters
  },

  setCurrentWord: function (currentWord) {
    this.currentWord = currentWord
  },

  reset: function () {
    this.guessedLetters = []
    this.currentWord = []
  }

}

const theHangmanPicture = (function () {
  'use strict'

  const hangmanPicture = {

    // Get all elements as their id
    partAsElement: {
      hill: document.getElementById('hang_hill'),
      gallow: document.getElementById('hang_construction'),
      body: document.getElementById('hang_body'),
      rightarm: document.getElementById('hang_rightarm'),
      leftarm: document.getElementById('hang_leftarm'),
      rightleg: document.getElementById('hang_rightleg'),
      leftleg: document.getElementById('hang_leftleg'),
      rope: document.getElementById('hang_rope'),
      head: document.getElementById('hang_head')
    },

    // Create an array with all valid parts
    validParts: [
      'hill',
      'gallow',
      'body',
      'rightarm',
      'leftarm',
      'rightleg',
      'leftleg',
      'rope',
      'head'
    ],

    /**
             * Check if part a valid part, writes error message to console if the part is invalid.
             *
             * @param string part Name of the part to check.
             *
             * @returns boolean true if valid part, else false.
             */
    isValid: function (part) {
      if (this.validParts.indexOf(part) === -1) {
        return false
      }
      return true
    },

    /**
             * Hide a part.
             *
             * @param string part Name of the part to hide.
             *
             * @returns void.
             */
    hide: function (part) {
      if (this.isValid(part)) {
        this.partAsElement[part].style.display = 'none'
      }
    },

    /**
             * Show a part.
             *
             * @param string part Name of the part to show.
             *
             * @returns void.
             */
    show: function (whichPart) {
      switch (whichPart) {
        case 1:
          this.partAsElement.hill.style.display = 'inline'
          break
        case 2:
          this.partAsElement.gallow.style.display = 'inline'
          break
        case 3:
          this.partAsElement.body.style.display = 'inline'
          break
        case 4:
          this.partAsElement.rightarm.style.display = 'inline'
          break
        case 5:
          this.partAsElement.leftarm.style.display = 'inline'
          break
        case 6:
          this.partAsElement.rightleg.style.display = 'inline'
          break
        case 7:
          this.partAsElement.leftleg.style.display = 'inline'
          break
        case 8:
          this.partAsElement.rope.style.display = 'inline'
          break
        case 9:
          this.partAsElement.head.style.display = 'inline'
          break
      }
    },

    hideAll: function () {
      hangmanPicture.hide('hill')
      hangmanPicture.hide('gallow')
      hangmanPicture.hide('body')
      hangmanPicture.hide('rightarm')
      hangmanPicture.hide('leftarm')
      hangmanPicture.hide('rightleg')
      hangmanPicture.hide('leftleg')
      hangmanPicture.hide('rope')
      hangmanPicture.hide('head')
    }
  }

  // Return the object to make it visible.
  return hangmanPicture
})()

const theHangmanGame =
{
  fails: 0,

  getFails: function () {
    return this.fails
  },

  incrementFails: function () {
    this.fails += 1
  },

  resetFails: function () {
    this.fails = 0
  },

  theHangmanGame: function () {
    'use strict'
    const guessedLetter = document.getElementById('guessedLetter').value
    document.getElementById('congratulations').innerHTML = ''
    document.getElementById('currentLetters').innerHTML = ''

    // Checks if we have already guessed on the letter, if we have we return and guess again.
    if (hangman.checkIfGuessed(guessedLetter, theWord.getGuessedLetters())) {
      document.getElementById('alreadyGuessed').innerHTML = 'Already guessed, guess another letter.'
      return
    } else if (hangman.checkLetter(guessedLetter, theWord.getWord())) { // Checks if the letter is correct.
      // Get positions so that we can fill the current correct guesses array in correct position.
      let positions = []
      const currentWord = theWord.getWord()
      const knownLetters = theWord.getCurrentWord()
      let currentLetters = theWord.getGuessedLetters()

      // Get the positions where the letter appear in the radom word.
      positions = hangman.indexesOfGuessedLetter(guessedLetter, currentWord)
      let positionCounter = 0

      // Loop through our random word.
      for (let counter = 0; counter < currentWord.length; counter++) {
        // If counter is same as the position in the array we fill that index with the guessed letter.
        if (counter === positions[positionCounter]) {
          knownLetters[counter] = guessedLetter
          positionCounter++
        } else {
          // If not the correct index fill the index with a space for now, but only if the current
          // index is empty.
          if (currentWord[counter] === undefined) {
            knownLetters[counter] = '_'
            positionCounter++
          }
        }
      }

      currentLetters += guessedLetter
      theWord.setGuessedLetters(currentLetters)
      theWord.setCurrentWord(knownLetters)
      document.getElementById('alreadyGuessed').innerHTML = ''
    } else {
      // Put the guessed letter in the already guessed letters array.
      let currentLetters = theWord.getGuessedLetters()
      currentLetters += guessedLetter
      theWord.setGuessedLetters(currentLetters)
      theHangmanGame.incrementFails()
      theHangmanPicture.show(theHangmanGame.getFails())
      document.getElementById('alreadyGuessed').innerHTML = ''
    }

    // Display the current correct letters in the word and guessed letters.
    const unchangedWord = theWord.getUnchangedWord()
    document.getElementById('currentLetters').innerHTML = 'The length of the word is: ' + unchangedWord.length + '. The current correct letters in the word: ' + theWord.getCurrentWord()
    document.getElementById('guessedLetters').innerHTML = 'Guessed letters: ' + theWord.getGuessedLetters()
    const currentWordToString = hangman.arrayToString(theWord.getCurrentWord())

    // If we guessed the correct word, the website will output a congratulations message and update the word.
    if (hangman.gameComplete(currentWordToString, theWord.getUnchangedWord()) || theHangmanGame.getFails() === 9) {
      document.getElementById('congratulations').innerHTML = 'The game is over, the correct word was: ' + theWord.getUnchangedWord() + ' The word will now be updated.'
      theHangmanGame.resetFails()
      // Set a small timeout so that the player see that they have lost.
      setTimeout(hangman.updateWord, 4000)
    }
  }
}

// If startbutton is clicked update the word. If guess button is clicked run the theHangmanGame function.
document.getElementById('startButton').onclick = () => {
   hangman.updateWord()
}
document.getElementById('clickButton').onclick = () => {
   theHangmanGame.theHangmanGame()
}
