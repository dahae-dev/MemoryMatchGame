// ----- card data -----
const cardList = [
  {
    'name': 'homer',
    'img': 'img/homer.png'
  },
  {
    'name' : 'marge',
    'img': 'img/marge.png'
  },
  {
    'name': 'bart',
    'img': 'img/bart.png'
  },
  {
    'name': 'lisa',
    'img': 'img/lisa.png'
  },
  {
    'name': 'maggie',
    'img': 'img/maggie.png'
  },
  {
    'name': 'burns',
    'img': 'img/burns.png'
  },
  {
    'name': 'ned',
    'img': 'img/ned.png'
  },
  {
    'name': 'milhouse',
    'img': 'img/milhouse.png'
  },
  {
    'name': 'muntz',
    'img': 'img/muntz.png'
  },
  {
    'name': 'skinner',
    'img': 'img/skinner.png'
  },
  {
    'name': 'ottomann',
    'img': 'img/ottomann.png'
  },
  {
    'name': 'willie',
    'img': 'img/willie.png'
  }
]

// ----- duplicate & shuffle cards -----
let cards = cardList.concat(cardList);
cards.sort(() => 0.5 - Math.random());

// ----- display cards -----
const gameboard = document.querySelector('.gameboard');

cards.forEach((item)=>{
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;

  const back = document.createElement('img');
  back.setAttribute('src','img/donut.png');
  back.classList.add('back');

  const front = document.createElement('img');
  front.setAttribute('src', item.img);
  front.classList.add('front');

  gameboard.appendChild(card);
  card.appendChild(back);
  card.appendChild(front);
})

// ----- game operation -----
let count = 0;
let firstCard = '';
let secondCard = '';
let prevCard = null;
let matches = 0;
let moves = 0;

const matchesDisplay = document.querySelector('.matches');
const movesDisplay = document.querySelector('.moves');

gameboard.addEventListener('click', function(){
  const clicked = event.target;
  const card = clicked.parentNode;

  if(clicked.className === 'gameboard' || count !== 0 && clicked === prevCard || card.childNodes[1].classList.contains('matched')) { return; }

  if(count < 2){
    count++;

    if(count === 1){
      firstCard = card.dataset.name;
      console.log(`firstCard=>${firstCard}`);
      card.childNodes[1].classList.add('clicked');
    } else {
      secondCard = card.dataset.name;
      console.log(`secondCard=>${secondCard}`);
      card.childNodes[1].classList.add('clicked');
    }

    if(firstCard !== '' && secondCard !== ''){
      countMoves();
      if(firstCard === secondCard){
        match();
        setTimeout(resetCount, 500);
        if(matches === 12){
          gameOver();
        }
      } else {
        setTimeout(resetCount, 1000);
      }
    }
    prevCard = clicked;
  }
});

const countMoves = () => {
  moves++;
  movesDisplay.innerHTML = moves;

  const stars = document.querySelectorAll('.star');
  if(moves > 16 && moves <= 24){
    for(var i = 0; i < 3; i++){
      if(i > 1){
        stars[i].classList.add('grayscale');
      }
    }
  } else if(moves > 24){
    for(var i = 0; i < 3; i++){
      if(i > 0){
        stars[i].classList.add('grayscale');
      }
    }
  }
}

const match = () => {
  matches++;
  matchesDisplay.innerHTML = matches;

  let matchedCards = document.querySelectorAll('.clicked');
  console.log(matchedCards);
  matchedCards.forEach((card) => {
    card.parentNode.childNodes[0].classList.add('invisible');
    card.classList.add('matched');
  })

  bounce();
}

const bounce = () => {
  let matchedCards = document.querySelectorAll('.matched');
  matchedCards.forEach((card) => {
    card.classList.add('bounce');
  })
}

const resetCount = () => {
  count = 0;
  firstCard = '';
  secondCard = '';

  let clickedCards = document.querySelectorAll('.clicked');
  clickedCards.forEach((card) => {
    card.classList.remove('clicked');
  });
}

const gameOver = () => {
  const modal = document.querySelector('.gameover');
  const result = document.createElement('img');
  if(moves <= 16){
    result.setAttribute('src','img/result_1.png');
  } else if(moves > 16 && moves <= 24){
    result.setAttribute('src','img/result_2.png');
  } else {
    result.setAttribute('src','img/result_3.png');
  }
  modal.appendChild(result);
  modal.addEventListener('click',replay);
}

const replay = () => {
  location.reload();
}
