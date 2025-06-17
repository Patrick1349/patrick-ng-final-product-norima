const imageList = ['img1.png', 'img2.png', 'img3.png', 'img4.png','img5.png'];

// Function to get a random image
function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * imageList.length);
  return `assets/${imageList[randomIndex]}`;
}