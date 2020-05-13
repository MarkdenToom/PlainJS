// const are constant references to a value: basically they're variables that can't be manipulated
// let can only be used inside a block, unlike var inside a block
// w3schools has good explanations of both const and let

// select all buttons
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// set default card
let currentActiveCard = 0;

// store cards
const cardsEl = [];

// card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'It is a container for a piece of data'
//   },
//   {
//     question: 'Give an example of a case sensitive variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// create cards
function createCards(){
  // create a card for every question and answer
  cardsData.forEach((data, index) => createCard(data, index));
}

// create a single card using the following layout
  // <div class="card active">
  //     <div class="inner-card">
  //         <div class="inner-card-front">
  //             <p>Question test</p>
  //         </div>
  //         <div class="inner-card-back">
  //             <p>Answer test</p>
  //         </div>
  //     </div>
  // </div>
function createCard(data, index){
  const card = document.createElement('div');
  card.classList.add('card');

  // only display the first card on the stack
  if (index === 0){
    card.classList.add('active')
  }

  card.innerHTML = `
      <div class="inner-card">
          <div class="inner-card-front">
              ${data.question}
          </div>
          <div class="inner-card-back">
              ${data.answer}
          </div>
      </div>
  `;

  // flip card on click
  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // add card to deck
  cardsEl.push(card);
  cardsContainer.appendChild(card);

  // display current card number between previous and next key
  updateCurrentText();
}

function updateCurrentText(){
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// get all cards from local storage
function getCardsData(){
  // local storage only stores strings, therefore we need to convert the array
  // of cards to a string and parse it to get the information again
  const cards = JSON.parse(localStorage.getItem('cards'));
  // if what we pull from local storage is null:
  //   return an empty array
  // else
  //   return cards
  return cards === null ? [] : cards;
};

// add new card to local storage
function setCardsData(cards){
  // save to local storage
  localStorage.setItem('cards', JSON.stringify(cards));
  // force reload the page to get the new cards info from local storage
  window.location.reload()
}

createCards();

// next button functionality
nextBtn.addEventListener('click', () => {
  // swipe the card to the left when you hit the next button
  cardsEl[currentActiveCard].className = 'card left';
  // set active card to the next card
  currentActiveCard = currentActiveCard + 1;
  // do nothing when at the last card
  if(currentActiveCard > cardsEl.length - 1){
    currentActiveCard = cardsEl.length - 1;
  }
  // update card class
  cardsEl[currentActiveCard].className = 'card active';
  // update 1/3, 2/3, etc.
  updateCurrentText();
});

// previous button functionality
prevBtn.addEventListener('click', () => {
  // swipe the card to the right when you hit the next button
  cardsEl[currentActiveCard].className = 'card right';
  // set active card to the previous card
  currentActiveCard = currentActiveCard - 1;
  // do nothing when at the first card
  if(currentActiveCard < 0){
    currentActiveCard = 0;
  }
  // update card class
  cardsEl[currentActiveCard].className = 'card active';
  // update 1/3, 2/3, etc.
  updateCurrentText();
});

// show add new card button overlay
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// hide add new card button overlay
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// add new card button
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  // display input value in console
  // console.log(question, answer);

  if(question.trim() && answer.trim()){
    // add new question & answer to the array
    const newCard = {question: question, answer: answer};
    createCard(newCard);
    questionEl.value = '';
    answerEl.value = '';

    // remove the overlay
    addContainer.classList.remove('show');

    // push is the same as append in Python
    cardsData.push(newCard);
    // update cardsData
    setCardsData(cardsData);
  }
})

// clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
