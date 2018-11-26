
/*
* Create a list that holds all of your cards
*/
const Cards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-anchor', 'fa-anchor',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb',
];


/*
* Display the cards on the page
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

TODO:
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

let cardsOpened = [];
const allCards = document.querySelectorAll('.card');

//Making toggle.class as its own function
function toggleCard (card){
  card.classList.toggle('open');
  card.classList.toggle('show');
}

//Push opened cards into the array
function addCardsOpened(card){
  cardsOpened.push(card);
  console.log(cardsOpened);
}

//Make cards turn around if no match
function noMatch(card){
  console.log(cardsOpened.length, ' cards opened')
        setTimeout(function(){
          toggleCard(cardsOpened[0]);
          toggleCard(cardsOpened[1]);
          cardsOpened = [];
        }, 1000);
}

//Give cards class .match
function match(card){
  cardsOpened[0].classList.add('match');
  cardsOpened[1].classList.add('match');
}

//Stop user from electing and storing more than two cards before a match is checked - will this interfare with a card mathcing function?
function cardLimit(card){
  cardsOpened.pop();
        !toggleCard(card);
        console.log(cardsOpened.length)
}

allCards.forEach(function(card){
  card.addEventListener('click', function() {
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
      toggleCard(card);
      addCardsOpened(card);
      //Check for match here
      
      if (cardsOpened[0].firstElementChild.className == cardsOpened[1].firstElementChild.className){
        console.log("MATCH!!!");
        match(card);
      }
      //will this if statement muddle with finding a match
      if (cardsOpened.length > 2) {
        cardLimit(card);
      };
      //If no match, cards go away
      if (cardsOpened.length ===2) {
        noMatch(card);
      };
    };
  });
});



// Setting up a pop up for end of game
const isGameOver = false;

if (isGameOver == true) {
  function gameFinished(){
    alert("Congratulations! You have won the game");
  };
  gameFinished();
};