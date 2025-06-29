const symbols = ['apple', 'banana', 'grape', 'cherry', 'strawberry', 'kiwi', 'pineapple', 'watermelon'];
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
    img.className = 'hidden-img'; // initially hidden
    card.appendChild(img);

    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
    return card;
  });

function flipCard(card) {
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length === 2) return;

  card.querySelector('img').classList.remove('hidden-img');
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.dataset.name === second.dataset.name) {
      first.classList.add('matched');
      second.classList.add('matched');
      flippedCards = [];
    } else {
      setTimeout(() => {
        first.querySelector('img').classList.add('hidden-img');
        second.querySelector('img').classList.add('hidden-img');
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}
