import { supabase } from './connection.js';

let currentIndex = 0;
let allGames = [];


function renderGameCard(game) {
  const hero = document.querySelector("#hero");
  const imageSrc = getRandomImage();

 hero.innerHTML = `
  <button class="game-card">
    <a href="game-detail.html?id=${game.id}">
      <div class="card-layer">
        <img class="card-background" src="${imageSrc}" alt="game image">
        <div class="card-content">
          <img class="card-img" src="${imageSrc}" alt="game image">
          <p class="card-players">${game.player_min} - ${game.player_max} players</p>
          <h2 class="card-title">${game.game_title}</h2>
          <p class="card-description">${game.description}</p>
        </div>
      </div>
    </a>
  </button>
`;

}

function renderMonthlyGames(games) {
  const container = document.querySelector("#sub-game-container");
  container.innerHTML = games.slice(0, 4).map(game => {
    const imageSrc = getRandomImage(); // Call per game
    return `
      <button class="sub-game-card">
        <a href="game-detail.html?id=${game.id}">
        <div class="card-layer">
        <img class="card-background" src="${imageSrc}" alt="game image">
          <div class="sub-card-content">
            <img class="sub-card-img" src="${imageSrc}" alt="game image">  
            <h2 class="sub-card-title">${game.game_title}</h2>
          </div>
        </div>  
        </a>
      </button>
    `;
  }).join('');
}



async function fetchGames() {
  const { data, error } = await supabase.from('design-game').select('*');
  if (error) {
    console.error("Error fetching games:", error);
    return;
  }

  allGames = data;
  currentIndex = Math.floor(Math.random() * allGames.length);
  renderGameCard(allGames[currentIndex]);

  renderMonthlyGames(allGames);
}


// Shuffle the card
function animateCardTransition(newGame) {
  const card = document.querySelector('.game-card');

  // Start fade out
  card.classList.add('fade-out');

  // Shorter delay before showing new card (speed up transition between)
  setTimeout(() => {
    renderGameCard(newGame); // render new card
    const newCard = document.querySelector('.game-card');
    newCard.classList.add('fade-in');

    // Remove fade-in class after it completes
    setTimeout(() => {
      newCard.classList.remove('fade-in');
    }, 900); // this matches your CSS fade-in duration
  }, 300); // was 600, now 300 for faster switch
}
document.addEventListener("DOMContentLoaded", () => {
  fetchGames();

  const shuffleButton = document.querySelector(".shuffle");
  shuffleButton.addEventListener("click", () => {
    if (allGames.length === 0) return;

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * allGames.length);
    } while (newIndex === currentIndex);

    currentIndex = newIndex;
    animateCardTransition(allGames[currentIndex]);
  });
});



// MENU

const OpenPopoutButton = document.getElementById('menu');
const PopoutNav = document.getElementById('popout');

OpenPopoutButton.addEventListener('click', () => {
  PopoutNav.classList.toggle('show');
});

const CloseMenu = document.querySelector('main');

CloseMenu.addEventListener('click', () => {
  PopoutNav.classList.remove('show');
});

// HEADER

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});



