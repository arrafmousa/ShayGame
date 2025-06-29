const board = document.getElementById('game-board');
const status = document.getElementById('status');
let flippedCards = [];
let matchedCount = 0;

const symbols = ['download', 'download (1)', 'download (2)', 'download (3)', 'download (4)'];

const cards = [...symbols, ...symbols]
  .sort(() => 0.5 - Math.random())
  .map((name, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.name = name;
    card.dataset.index = index;

    const img = document.createElement('img');
    img.src = `images/${name}.png`;
    img.alt = name;

    card.appendChild(img);
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
    return card;
  });

function flipCard(card) {
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length === 2) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.dataset.name === second.dataset.name) {
      first.classList.add('matched');
      second.classList.add('matched');
      flippedCards = [];
      matchedCount += 2;
      if (matchedCount === cards.length) {
        status.textContent = '🎉 You Win!';
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}
