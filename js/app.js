
/*
* Create a list that holds all of your cards
*/
let start;

let Cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-bolt', 'fa-bolt',
             'fa-cube', 'fa-cube',
             'fa-anchor', 'fa-anchor',
             'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
             'fa-bomb', 'fa-bomb',
            ];

//function randomiseCards(card){
//  return '<li class="card"><i class="fa ${Cards}"></i></li>';
//}

/*
* Display the cards on the page DONE:
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}


/*
DONE:
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*    + Populate final display a message with the stars and final time
*    + Add timer

TODO:

let cardsOpened = [];
const allCards = document.querySelectorAll('.card');
const star = document.querySelector('stars');
let movesCount = 0;
let starCounter = 0;
let scorePanel = document.querySelectorAll('score-panel');
let matchCounter = 0;
let winnerPannel = document.querySelector('.winner-background');
const deck = document.querySelector('.deck');
let clockOff = true;
let time = 0;
let clockID;
let stars = 3;
const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));


function shuffleCards(){
  console.log('C2S', cardsToShuffle);
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards){
    deck.appendChild(card);
  }
}

shuffleCards();

//Making toggle.class as its own function
function toggleCard (card){
  card.classList.add('animated', 'fast', 'flipInY');
  card.classList.toggle('open');
  card.classList.toggle('show');
  setTimeout(function(){
    card.classList.remove('animated', 'fast', 'flipInY');
  }, 300);
  
}

//Push opened cards into the array
function addCardsOpened(card){
  cardsOpened.push(card);
  console.log(cardsOpened);
}

//Make cards turn around if no match
function noMatch(card){ 
  setTimeout(function(){
    toggleCard(cardsOpened[0]);
    toggleCard(cardsOpened[1]);
    cardsOpened[0].classList.toggle('wrong');
    cardsOpened[1].classList.toggle('wrong');
    cardsOpened[0].classList.remove('animated', 'shake');
    cardsOpened[1].classList.remove('animated', 'shake');
    cardsOpened = [];
    starCount();
  }, 800);
}

//Give cards class .match
function match(card){
  setTimeout (function(){
    cardsOpened[0].classList.toggle('match');
    cardsOpened[1].classList.toggle('match');
    cardsOpened[0].classList.add('animated', 'tada');
    cardsOpened[1].classList.add('animated', 'tada');  
    starCount();
    cardsOpened = [];
  }, 800);
}

function flip(card){
  cardsOpened[0].classList.add('animated', 'tada');
  cardsOpened[1].classList.add('animated', 'tada');
}


//Stop user from electing and storing more than two cards before a match is checked
function cardLimit(card){
  cardsOpened.pop();
  !toggleCard(card);
  card.classList.remove('animated', 'fast', 'flipInY');
  console.log(cardsOpened.length)
}

//Increment move counter
function movesConter(){
  movesCount ++;
  const movesNumber = document.querySelector('.moves');
  movesNumber.innerHTML = movesCount;
}

//Stars
function starCount(){
  const starPanel = document.querySelector('.stars').children;
  if (movesCount === 10){
    starCounter ++;
    starPanel[0].classList.add('hide');
    stars = 2;
  } else if (movesCount === 14){
    starCounter ++;
    starPanel[1].classList.add('hide');
    stars = 1;
  }
}

//Set cancel button to hide winner popup
function cancelButton(){
  const closeButton = document.querySelector('.cancel');
  const exitButton = document.querySelector('.close');
  closeButton.addEventListener('click', function(){
    winnerPannel.classList.toggle('showPanel');
  });
  exitButton.addEventListener('click', function(){
    winnerPannel.classList.toggle('showPanel');
  });
}

//set the replay button in winner panel to reset
function replayButton(){
  const replayButt = document.querySelector('.replay');
  replayButt.addEventListener('click', function(){
    winnerPannel.classList.toggle('showPanel');
    reset();
  });
}

//set the replay button on game to reset
function restartButton(){
  const restartButton = document.querySelector('.restart');
  restartButton.addEventListener('click', function(){
    reset();
  });
}

// Populating winner panel
function gameFinished(){
  const totalMoves = document.querySelector('.total-moves');
  const totalTime = document.querySelector('.total-time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const totalStars = document.querySelector('.total-stars');
  const totalStarsDisplay = document.querySelector('.stars').innerHTML;
  totalMoves.innerHTML = movesCount;
  totalTime.innerHTML = clockTime;
  totalStars.innerHTML = stars;
  cancelButton();
  replayButton();
  winnerPannel.classList.toggle('showPanel');
}

// Pop up when all matches are made
function winner(){
  matchCounter ++;
  if (matchCounter === 8){
    stopClock();
    setTimeout(function(){
      gameFinished();
    }, 2500);
  }
}

//Clock timer
function startClock(){
  clockID = setInterval(function() {
    time ++;
    console.log(time);
    displayClock();
  }, 1000);
}

//Disply clock
function displayClock(){
  const clock = document.querySelector('.clock');
  let minutes = Math.floor(time / 60);
  let seconds = time % 60; 
  clock.innerHTML = time;
  if (seconds <= 10){
    clock.innerHTML = minutes + ':0' + seconds;
  } else {
    clock.innerHTML = minutes + ':' + seconds;
  };
}

//Stop clock
function stopClock(){
  clearInterval(clockID);
}

//Reset the game
function reset(){
  resetTime();
  resetStars();
  resetMoves();
  resetCards();
  shuffleCards();
}

function resetTime(){
  stopClock();
  clockOff = true;
  time = 0;
  displayClock();
}

function resetStars(){
  const starPanel = document.querySelector('.stars').children;
  starPanel[0].classList.toggle('hide');
  starPanel[1].classList.toggle('hide');
}

function resetMoves(){
  movesCount = 0;
  const movesNumber = document.querySelector('.moves');
  movesNumber.innerHTML = movesCount;
}

function resetCards(){
  for (card of cardsToShuffle){
    card.classList.remove('match', 'open', 'show', 'animated', 'tada');
  }
}

restartButton();

allCards.forEach(function(card){
  card.addEventListener('click', function() {
    if (clockOff){
      startClock();
      clockOff = false;
    }
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
      toggleCard(card);
      addCardsOpened(card);
      //Check for match here
      if (cardsOpened.length == 2) {
         if (cardsOpened[0].firstElementChild.className == cardsOpened[1].firstElementChild.className){
           console.log("MATCH!!!");
           
           match(card);
           movesConter();
           winner();
//           console.log(cardsOpened.length);
        } else {
          setTimeout(function(){
          movesConter();
          cardsOpened[0].classList.add('animated', 'shake');
          cardsOpened[1].classList.add('animated', 'shake');
          cardsOpened[0].classList.toggle('wrong');
          cardsOpened[1].classList.toggle('wrong');
          noMatch(card);
            }, 400);
        }
      };
      if (cardsOpened.length > 2) {
        cardLimit(card);
      };
      //will this if statement muddle with finding a match? Doesn't seem to thus far
//      if (cardsOpened.length > 2) {
//        cardLimit(card);
//      };
      //If no match, cards go away
//      if (cardsOpened.length ===2) {
//        movesConter();
//        noMatch(card);
//      };
    };
  });
});



