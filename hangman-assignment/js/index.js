/* varibales declared*/
 const timeLeftDisplay =document.getElementById('time-left');
 const startGameBtn = document.getElementById('start-game');

 const wordElement = document.getElementById('word');
 const wrongLetterElement = document.getElementById('wrong-letters');
 const playAgainBtn = document.getElementById('play-again');
 const popupContainer = document.getElementById('popup-container');
 const startScreenContainer = document.getElementById('start-screen-container');
 const startScreenPopup = document.getElementById('start-screen-popup');
 const notification = document.getElementById('notification-container');
 const result = document.getElementById('result');
 const resultRevealWord = document.getElementById('result-reveal-word');
 const popup = document.getElementById('popup');
 const playAgain = document.getElementById('play-btn');

 /*start btn and timer*/
 
 startGameBtn.addEventListener("click", start);
 
 let timeLeft = 60;
 startGameBtn.addEventListener('click', timer);
 
 function timer() {
     var myTimer = setInterval(function() {
         if(timeLeft <= 0) {
             clearInterval(timeLeft = 0)
             result.innerText = 'You lost! Times up!';
             popupContainer.style.setProperty("display", "flex");
             popup.style.setProperty('display', 'flex');
            }
            else if (chosenWord.length === correctLetters.length) {
                clearInterval(myTimer);
            }
            timeLeftDisplay.innerHTML = timeLeft
            timeLeft -=1
        }, 1000)
    }
    
 /* main game functions */   
 const words = ['ghost', 'spooky','pumpkin', 'candy', 'witch', 'tenta'];
 const correctLetters = [];
 const wrongLetters = [];

 let chosenWord = words[Math.floor(Math.random() * words.length)];

 const wrongGuess = [];
 const rightGuess = [];

 function displayWord() {
    wordElement.innerHTML = `
    ${chosenWord
        .split('')
        .map(
            letter => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}

            </span>
        `
        )
         .join('')}
    `;

	const innerWord = wordElement.innerText.replace(/[ \n]/g, '');
// victory notification
	if (innerWord === chosenWord) {
        result.innerText = 'Spooktastic! You won! ';
		popupContainer.style.setProperty("display", "flex");
        popup.style.setProperty('display', 'flex');
		playable = false;
	}

 }

 //wrong guess update + you lost notification
 function updateWrongLettersElement() {
     wrongLetterElement.innerHTML = `
     ${wrongLetters.length > 0 ? '<p class="instructionsletters"> Guess again!</p>' : ''}
     ${wrongLetters.map(letter => `<span class="wrongLetter">${letter}</span>`)}
     `;

     const errors = wrongLetters.length;
    if(errors === 1){
        document.querySelector('figure').classList.add('scaffold');
    }
    else if (errors === 2){
        document.querySelector('figure').classList.add('head');
    }
    else if (errors === 3){
        document.querySelector('figure').classList.add('body');
    }
    else if (errors === 4){
        document.querySelector('figure').classList.add('arms');
    }
    else if (errors === 5){
        document.querySelector('figure').classList.add('legs');
        result.innerText = 'You lost! You got hanged! \n The correct word was: \n' + chosenWord;
		popupContainer.style.setProperty("display", "flex");
        popup.style.setProperty('display', 'flex');
    }
    else {
        console.log("antal fel gissningar: " + errors);
    }

 }

 // Wrong guess nitification
function ShowNotification() {
    notification.style.setProperty("display", "flex");

    setTimeout(removeNotification, 5000);
}


function removeNotification() {
    notification.style.setProperty("display", "none");
}
 //eventlistner keydown to guess a letter
 window.addEventListener('keypress', e => {
    if(chosenWord.includes(e.key)) {
        if(!correctLetters.includes(e.key)) {
            correctLetters.push(e.key);
            
            displayWord();
        } else {
            ShowNotification();
        }
    } else {
        if(!wrongLetters.includes(e.key)) {
            wrongLetters.push(e.key)

            updateWrongLettersElement();
        } else {
            ShowNotification();
        }

    }
 })
 displayWord();


function reload(){
    reload = location.reload();
}

function start(){
    startScreenContainer.style.setProperty("display", "none");
    startScreenPopup.style.setProperty("display", "none");
}

playAgain.addEventListener("click", reload, false);


