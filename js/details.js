const movieDetails = document.querySelector(".game-details");
const movieTitle = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);
const API_KEY = "k_0t32uy7t";
const API_URL = `https://imdb-api.com/en/API/Title/${API_KEY}/${id}`;
console.log(API_URL);
async function fetchGame() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const title = data.title;
    const image = data.image;
    const plot = data.plot;
    console.log(data);
    movieTitle.innerHTML = `${title}`;
    movieDetails.innerHTML = "";
    movieDetails.innerHTML = `<h1>${title}</h1>
    <div class= "image" style = "background-image: url('${image}'")></div>
    <div> ${plot}</div>`;
    for (let i = 0; i < data.starList.length; i++) {
      const starActor = data.starList[i].id;
      for (let i = 0; i < data.actorList.length; i++) {
        if (starActor === data.actorList[i].id) {
          movieDetails.innerHTML += `
                  <div class= "starActors_image" style = "background-image: url('${data.actorList[i].image}'")></div>`;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

fetchGame();
