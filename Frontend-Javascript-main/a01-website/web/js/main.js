/*
    If the button is pressed run the function randomWord.
*/
document.getElementById("randomFruit").onclick = function () {
    randomWord();
}

/*  
    The core function which chooses a random word out of the array wordArray.
    Then we use the word and checks how it looks in upper case and lowercase, checks how many letters it has 
    then finally how many vowels and consonants then word has. After that we check if a character that a user
    guessed on is in the word and how many times it is in it.
*/
function randomWord() {
    var guessedCharacter = document.getElementById("characterGuess").value;
    let wordArray = ['Apple', 'Banana', 'Cherry', 'Dates', 'Elderberry', 'Fig', 'Grapefruit',
        'Hackberry', 'Jackfruit', 'Kiwi', 'Lime', 'Mango', 'Nectarine', 'Orange', 'Papaya', 'Quince',
        'Raspberry', 'Strawberry', 'Tangerine', 'Ugni'];
    var randomNumber = getRandomNumber();
    var fruit = wordArray[randomNumber];
    var lowerCase = wordArray[randomNumber].toLowerCase();
    var upperCase = wordArray[randomNumber].toUpperCase();
    var letterCounter = wordArray[randomNumber].length;
    let counters = countVowels(fruit);
    var characterHits = checkAmountOfHits(guessedCharacter, fruit);
    var indexOfHits = indexesOfGuessedCharacter(guessedCharacter, fruit);

    document.getElementById("theFruit").innerHTML = "The random fruit: " + fruit;
    document.getElementById("upperCaseFruit").innerHTML = "The random fruit in lower case: " + lowerCase;
    document.getElementById("lowerCaseFruit").innerHTML = "The random fruit in upper case: " + upperCase;
    document.getElementById("letterCounter").innerHTML = "Amount of letter in " + fruit + ": " + letterCounter;
    document.getElementById("vowelCounter").innerHTML = "Vowels: " + counters[0] + " Consonants: " + counters[1];

    if (checkCharacter(guessedCharacter, fruit)) {
        document.getElementById("fruitContainsCharacter").innerHTML = "Does the fruit " + fruit + " contain character " + guessedCharacter + "? Yes it does!";
    }
    else {
        document.getElementById("fruitContainsCharacter").innerHTML = "Does the fruit " + fruit + " contain character " + guessedCharacter + "? No it does not!";
    }

    document.getElementById("fruitContainsCharacterMultiple").innerHTML = "How many letters of character \"" + guessedCharacter + "\" does the fruit " + fruit + " contain: " + characterHits;

    if (indexOfHits.length == 0) {
        document.getElementById("indexOfGuessedCharacter").innerHTML = "At which index/indexes on the fruit \"" + fruit + "\" does the guessed character \"" + guessedCharacter + "\" appear? It appears that the fruit does not contain the guessed character.";

    }
    else {
        document.getElementById("indexOfGuessedCharacter").innerHTML = "At which index/indexes on the fruit \"" + fruit + "\" does the guessed character \"" + guessedCharacter + "\" appear? It appears at index/indexes: " + indexOfHits + ".";

    }
}

//Random number 0-19.
function getRandomNumber() {
    return Math.floor(Math.random() * 20);
}

//Counts how many vowels there are in the word.
function countVowels(fruit) {
    let vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    var vowelsCounter = 0;
    var consonantCounter = 0;

    for (var vowelCounter = 0; vowelCounter < vowels.length; vowelCounter++) {
        if (fruit.includes(vowels[vowelCounter])) {
            vowelsCounter++;
        }
        else {
            consonantCounter++;
        }
    }

    let counters = [vowelsCounter, consonantCounter];
    return counters;    //Returns the array with the counter for vowels and consonants.
}

//Checks if the character is included in the word.
function checkCharacter(guessedCharacter, fruit) {
    if (fruit.includes(guessedCharacter.toLowerCase()) || fruit.includes(guessedCharacter.toUpperCase())) {
        return true;
    }

    return false;
}

/*
    Checks how many times the character occurs in the word. I do it by splitting the word using the guessed character.
    Then depending on the length of the new array (minus 1) we get the amount of times the character occurs
    in the word.
    Example: We have guessed a and we have Raspberry we split and get [R, spberry] which gives length 2, but
    a only occurs once thats why we reduce it with 1 to get correct amount of hits.
*/
function checkAmountOfHits(guessedCharacter, fruit) {
    var fruitWithoutCharacter = fruit.split(guessedCharacter).length - 1;
    return fruitWithoutCharacter;
}

/*
    Finds out the indexes of where the character appears in the string. I use include as the condition
    for the while loop so that it continues until the character no longer is in the string. Inside the if 
    statement I first find out the index of the first occurance of the character using indexOf and then I replace
    that occurance with a empty space " " using replace(). By repeating this I will be able to find out all 
    indexes in the string.
*/
function indexesOfGuessedCharacter(guessedCharacter, fruit) {
    let indexArray = [];
    var counter = 0;
    var theCharacter = guessedCharacter.toUpperCase();  //Puts the character and string to uppercase so that we are 
    // not case sensitive.
    var newString = fruit.toUpperCase();

    while (newString.includes(theCharacter)) {
        indexArray[counter++] = newString.indexOf(theCharacter);
        newString = newString.replace(theCharacter, " ");
    }

    return indexArray;
}