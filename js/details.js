const movieDetails = document.querySelector(".movie-details");
const movieTitle = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);
const API_KEY = "k_wa6hawzf";
const API_URL = `https://imdb-api.com/en/API/Title/${API_KEY}/${id}`;
console.log(API_URL);
async function fetchMovieDetails() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const title = data.title;
    const image = data.image;
    const plot = data.plot;
    console.log(data);
    movieTitle.innerHTML = `${title}`;
    movieDetails.innerHTML = "";
    movieDetails.innerHTML = `
    <div class= "image" style = "background-image: url('${image}'")></div>
    <h1>${title}</h1>`;
    //if statement below is based on that the database has "The plot is unknown" as default when empty.
    if (plot === "The plot is unknown.") {
      movieDetails.innerHTML += `<div>
                                  <p>So sorry, but the film production companies, ${data.companies}, have not released the plot yet.</p> 
                                  <p>As soon as they release it, you find it here.</p>
                                </div>`;
    } else {
      movieDetails.innerHTML += `<div> ${plot}</div>`;
    }
    movieDetails.innerHTML += `<h2> Some of the stars in this movie</h2>`;
    for (let i = 0; i < data.starList.length; i++) {
      //const starActor = data.starList[i].id;

      /*Encountered error 404 while retrieving URL of some of the images.
      Tried to skip these interactions with "if statement and continue" But realised it wont catch errors such as 401/404 etc.
      So instead I'm using try/catch, where trying to fetch the image url works well.
      However, encounter some error messages in the console from the fetch when it doesn't succeed. Didn't prioritize this error, the user wont see this.*/
      let imageOfActor = "";
      async function fetchImage() {
        try {
          const response = await fetch(data.actorList[i].image);
          imageOfActor = response.url;
          console.log(imageOfActor);
          movieDetails.innerHTML += `
                  <div class= actors movie>
                    <div class= "starActors_image" style = "background-image: url('${data.actorList[i].image}'")></div>
                    <p><span>${data.actorList[i].name}</span> as <span>${data.actorList[i].asCharacter}</span></p>
                  </div>`;
        } catch (error) {
          console.log(error);
        }
      }
      fetchImage();
    }
  } catch (error) {
    console.log(error);
  }
}

fetchMovieDetails();
