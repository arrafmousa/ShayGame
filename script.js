const imageNames = [
  "download.jpeg",
  "download (1).jpeg",
  "download (2).jpeg",
  "download (3).jpeg",
  "download (4).jpeg"
];

const images = [...imageNames, ...imageNames]; // Duplicate for matching
const shuffled = images.sort(() => 0.5 - Math.random());

const board = document.getElementById("game-board");
let flipped = [];
let matched = [];

shuffled.forEach((img, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.img = img;
  card.dataset.index = index;

  card.addEventListener("click", () => {
    if (flipped.length === 2 || matched.includes(index)) return;

    card.style.backgroundImage = `url('images/${img}')`;
    flipped.push({ index, img });

    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (first.img === second.img && first.index !== second.index) {
        matched.push(first.index, second.index);
      } else {
        setTimeout(() => {
          document.querySelectorAll(".card")[first.index].style.backgroundImage = "url('images/back.jpeg')";
          document.querySelectorAll(".card")[second.index].style.backgroundImage = "url('images/back.jpeg')";
        }, 800);
      }
      flipped = [];
    }
  });

  board.appendChild(card);
});
