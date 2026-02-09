const screens = document.querySelectorAll('.screen');
const board = document.getElementById('gameBoard');

let firstCard = null;
let lock = false;

/* NAVEGAÇÃO */
function goTo(screenId) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

/* INICIAR JOGO */
function startGame() {
  goTo('screen-game');
  generateBoard();
}

/* GERAR TABULEIRO */
function generateBoard() {
  board.innerHTML = '';
  firstCard = null;
  lock = false;

  const values = ['🍎','🍌','🍇','🍓','🍍','🥝'];
  const cards = [...values, ...values].sort(() => Math.random() - 0.5);

  cards.forEach(value => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">?</div>
        <div class="card-face card-back">${value}</div>
      </div>
    `;

    card.addEventListener('click', () => handleCardClick(card));
    board.appendChild(card);
  });
}

/* CLIQUE NA CARTA */
function handleCardClick(card) {
  if (lock || card.classList.contains('flip')) return;

  card.classList.add('flip');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  const firstValue = firstCard.querySelector('.card-back').textContent;
  const currentValue = card.querySelector('.card-back').textContent;

  if (firstValue === currentValue) {
    card.classList.add('matched');
    firstCard.classList.add('matched');
    firstCard = null;
  } else {
    lock = true;

    card.classList.add('error');
    firstCard.classList.add('error');

    setTimeout(() => {
      card.classList.remove('flip', 'error');
      firstCard.classList.remove('flip', 'error');
      firstCard = null;
      lock = false;
    }, 700);
  }
}
