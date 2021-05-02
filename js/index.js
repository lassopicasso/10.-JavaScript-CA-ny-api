const url = "https://imdb-api.com/en/API/SearchMovie/k_wa6hawzf/batman";

const containerResults = document.querySelector(".details");

async function batmanOverview() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const data = json.results;

    containerResults.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const image = data[i].image;
      const title = data[i].title;
      const releaseYear = data[i].description;
      containerResults.innerHTML += `
              <a href="details.html?id=${data[i].id}">        
              <div class= movie>
               <div class= "image" style = "background-image: url('${image}'")></div>
                <div class="image_text">
                  <h3>${title}</h3>
                  <p>Year release ${releaseYear}</p>
                </div>
              </div></a>`;
    }
  } catch (error) {
    console.log(error);
    containerResults.innerHTML = message("error", error);
  }
}

batmanOverview();
