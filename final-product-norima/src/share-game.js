import { supabase } from './connection.js';

const form = document.querySelector("#game-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Stop the form from reloading the page

  const formData = new FormData(form);
  const newGame = {
    game_title: formData.get("game_title"),
    description: formData.get("description"),
    player_min: Number(formData.get("player_min")),
    player_max: Number(formData.get("player_max")),
    equipment: formData.get("equipment"),
    instruction: formData.get("instruction")
  };

  const { data, error } = await supabase
    .from("design-game")
    .insert([newGame])
    .select();

  if (error) {
    console.error("Insert failed:", error);
    alert("Oops! Something went wrong. Try again.");
    return;
  }

  // Redirect to game-detail.html using the new game's ID
  const newGameID = data[0].id;
  window.location.href = `game-detail.html?id=${newGameID}`;
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