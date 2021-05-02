const movieDetails = document.querySelector(".movie-details");
const movieTitle = document.querySelector("title");
const actors = document.querySelector(".actors");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const api_key = "k_0t32uy7t";
const api_url = `https://imdb-api.com/en/API/Title/${api_key}/${id}`;

async function fetchMovieDetails() {
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    movieDetails.innerHTML = "";

    const title = data.title;
    const image = data.image;
    const plot = data.plot;

    movieTitle.innerHTML = `${title}`;

    movieDetails.innerHTML = `
            <div class= " image_movie content_movieDetails" style = "background-image: url('${image}'")></div>
            <h1>${title}</h1>`;
    //if statement below is based on that the database has "The plot is unknown" as default when empty.
    if (plot === "The plot is unknown.") {
      movieDetails.innerHTML += `<div class = "plot">
                                  <p>So sorry, but the film production companies, ${data.companies}, have not released the plot yet.</p> 
                                  <p>You will find it here as soon they release it.</p>
                                </div>`;
    } else {
      movieDetails.innerHTML += `<div class = "plot"> ${plot}</div>`;
    }

    movieDetails.innerHTML += `<h2> Some of the stars in this movie</h2>`;
    for (let i = 0; i < data.starList.length; i++) {
      /*Encountered error 404 while retrieving URL of some of the images.
      Tried to skip these interactions with "if statement and continue" But realised it wont catch errors such as 401/404 etc.
      So instead I'm using try/catch, where trying to fetch the image url works well.
      However, will encounter some error messages in the console from the fetch when it doesn't succeed. 
      Didn't prioritize this error because it doesnt harm the display for the user. That's why the cache only console.log the error.*/
      let imageOfActor = "";
      async function fetchImage() {
        try {
          const starActor = data.actorList[i];
          const response = await fetch(starActor.image);
          imageOfActor = response.url;
          actors.innerHTML += `
                  <div class= >
                    <div class= "starActors_image" style = "background-image: url('${starActor.image}'")></div>
                    <p><span>${starActor.name}</span> as <span>${starActor.asCharacter}</span></p>
                  </div>`;
        } catch (error) {
          console.log(error);
        }
      }
      fetchImage();
    }
  } catch (error) {
    movieDetails.innerHTML = message("error", error);
  }
}

fetchMovieDetails();
