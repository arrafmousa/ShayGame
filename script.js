const board = document.getElementById('game-board');
const status = document.getElementById('status');
let flippedCards = [];
let matchedCount = 0;

const symbols = ['🍎', '🍌', '🍇', '🍒', '🍓', '🥝', '🍍', '🍉'];
const cards = [...symbols, ...symbols]
  .sort(() => 0.5 - Math.random())
  .map((symbol, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.textContent = '';
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
    return card;
  });

function flipCard(card) {
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length === 2) return;

  card.textContent = card.dataset.symbol;
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.dataset.symbol === second.dataset.symbol) {
      first.classList.add('matched');
      second.classList.add('matched');
      matchedCount += 2;
      flippedCards = [];

      if (matchedCount === cards.length) {
        status.textContent = '🎉 You Win!';
      }
    } else {
      setTimeout(() => {
        first.textContent = '';
        second.textContent = '';
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}
