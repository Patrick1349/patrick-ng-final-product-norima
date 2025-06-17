import { supabase } from './connection.js';

let allGames = [];
let currentStartIndex = 0;
const pageSize = 6;

// Renders 4 monthly featured games
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

// Renders paginated games and updates arrow state
function renderMoreGames(games) {
  const container = document.querySelector("#more-game-container");
  const pageGames = games.slice(currentStartIndex, currentStartIndex + pageSize);

  container.innerHTML = pageGames.map(game => {
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
    
  updateArrowStates();
}

// Disables/enables arrows visually and logically
function updateArrowStates() {
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");

  if (!leftArrow || !rightArrow) return; // Prevent errors if DOM isn't ready

  // Disable if at beginning or end
  leftArrow.style.opacity = currentStartIndex === 0 ? "0.5" : "1";
  rightArrow.style.opacity = currentStartIndex + pageSize >= allGames.length ? "0.5" : "1";

  // Optional: Also disable clicks
  leftArrow.style.pointerEvents = currentStartIndex === 0 ? "none" : "auto";
  rightArrow.style.pointerEvents = currentStartIndex + pageSize >= allGames.length ? "none" : "auto";
}

// Fetch games from Supabase
async function fetchGames() {
  const { data, error } = await supabase.from('design-game').select('*');
  if (error) {
    console.error("Error fetching games:", error);
    return;
  }

  allGames = data;

  renderMonthlyGames(allGames);
  renderMoreGames(allGames); // Initial render
}

// Wait for DOM to load before attaching events
document.addEventListener("DOMContentLoaded", () => {
  fetchGames();

  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");

  leftArrow.addEventListener("click", () => {
    if (currentStartIndex > 0) {
      currentStartIndex -= pageSize;
      renderMoreGames(allGames);
    }
  });

  rightArrow.addEventListener("click", () => {
    const maxStartIndex = allGames.length - pageSize;
    if (currentStartIndex < maxStartIndex) {
      currentStartIndex += pageSize;
      renderMoreGames(allGames);
    }
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