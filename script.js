const images = [
  'img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png'
];
const doubledImages = [...images, ...images]; // make pairs
const shuffled = doubledImages.sort(() => 0.5 - Math.random());

const board = document.getElementById('game-board');
let flipped = [];
let matched = [];

shuffled.forEach((img, index) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.img = img;
  card.dataset.index = index;
  card.style.backgroundImage = "url('images/back.png')"; // default back image

  card.addEventListener('click', () => {
    if (flipped.length === 2 || matched.includes(index)) return;

    card.style.backgroundImage = `url(images/${img})`;
    flipped.push({ index, img });

    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (first.img === second.img && first.index !== second.index) {
        matched.push(first.index, second.index);
      } else {
        setTimeout(() => {
          document.querySelectorAll('.card')[first.index].style.backgroundImage = "url('images/back.png')";
          document.querySelectorAll('.card')[second.index].style.backgroundImage = "url('images/back.png')";
        }, 800);
      }
      flipped = [];
    }
  });

  board.appendChild(card);
});
