import { supabase } from './connection.js';

const pageID = new URLSearchParams(window.location.search).get('id');

let currentIndex = 0;
let allGames = [];

const { data, error } = await supabase
  .from('design-game')
  .select('*')
  .eq('id', pageID);

document.querySelector("#game-detail").innerHTML = data.map(post => {
  const imageSrc = getRandomImage(); // generate once

  return `
    <div class="game-detail-card">
      <div class="card-layer">
        <img class="card-background" src="${imageSrc}" alt="game image">
        <div class="card-content">
          <img class="card-detail-img" src="${imageSrc}" alt="game image">
        </div>
      </div>
    </div>
    <div class= "player-count">
      <p>${post.player_min} - ${post.player_max} players</p>
    </div>
    <div class="intro-detail">
      <h2>${post.game_title}</h2>
      <p>${post.description}</p>
    </div>

    <div class="equipment">
      <h2>Equipment</h2>
      <p>${post.equipment}</p>
    </div>

    <div class="instruction">
      <h2>Instruction</h2>
      <p>${post.instruction}</p>
    </div>
  `;
}).join('');


function renderMonthlyGames(games) {
  const container = document.querySelector("#sub-game-container");
  container.innerHTML = games.slice(0, 2).map(game => {
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

  renderMonthlyGames(allGames);
}

fetchGames();


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