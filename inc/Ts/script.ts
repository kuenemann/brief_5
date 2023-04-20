import { error, event } from "jquery";
import { apiKey } from "./api";
/* base url */
const baseUrl = `https://api.themoviedb.org/3/`;
/* url imge */
const baseUrlImage = `https://image.tmdb.org/t/p/w185/`;
/* les plus populaire */
const popularMovie = `${baseUrl}movie/popular?${apiKey}&language=fr-FR&page=1`;
/* les Mieux Notés  */
const TopRated = `${baseUrl}movie/top_rated?${apiKey}&language=fr-FR&page=1`;
/* film A venir */
const UpComing = `${baseUrl}movie/upcoming?${apiKey}&language=fr-FR&page=1`;
/* api recherche films*/

// Fonction pour effectuer une recherche de film //
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchbtn = document.getElementById('search-btn')

searchbtn?.addEventListener("click",async()=>{
  const query: any = searchInput.value
  const searchMovie = `${baseUrl}search/movie?${apiKey}&language=fr-FR&query=${query}&page=1&include_adult=false`;
  const response = await fetch(searchMovie);
  const data = await response.json();
  const afftableaux = data.results;
  console.log(afftableaux);
  
  const popup: Window | null = window.open('', 'popup', 'width=500,height=500');
  popup?.document.write('<h2>Résultats de recherche</h2>');

  const resultList = popup.document.createElement('ul');
  afftableaux.forEach((item) => {
    const listItem = popup.document.createElement('li');
    const image = popup.document.createElement('img');
    image.src = baseUrlImage + item.poster_path;
    listItem.appendChild(image);
    resultList.appendChild(listItem);
    console.log(listItem);
  });

  popup?.document.body.appendChild(resultList);

  const resetBtn = popup.document.createElement('button');
  resetBtn.textContent = "Nouvelle recherche";
  resetBtn.addEventListener('click', () => {
    popup?.close();
    window.location.reload();
  });
  popup?.document.body.appendChild(resetBtn);
});



/* création de la popup de l'input */





/* début de film populaire */
async function getDataPopular() {
  try {
    const response = await fetch(popularMovie);
    const data = await response.json();

    const tableauEntier = data.results;
    /* console.log(tableauEntier); */

    let movieId;
    for (let i = 0; i < tableauEntier.length; i++) {
      movieId = tableauEntier[i].id;
     

      const div = document.createElement("div");
      document.getElementById("moviepopular")?.appendChild(div);
      div.classList.add("popularMovie");
      const img = document.createElement("img");

      const imagePath = baseUrlImage + tableauEntier[i].poster_path;

      img.setAttribute("src", imagePath);
      document.querySelector(".popularMovie")?.appendChild(img);

      // Écoutez le clic sur l'image
      img.addEventListener("click", async () => {
        // Créez une div pour la popup
        const popup = document.createElement("div");
        popup.classList.add("popup");

        // Ajoutez chemin de l'affiche image

        const imagePath = baseUrlImage + tableauEntier[i].poster_path;
        const img = document.createElement("img");
        img.src = imagePath;

        popup.classList.add("popup");
        popup.appendChild(img);
        document.body.appendChild(popup);

        // Ajoutez le titre du film à la popup
        const title = document.createElement("h2");
        title.textContent = tableauEntier[i].title;
        popup.appendChild(title);

        const title2 = document.createElement("h2");

        // Ajoutez la description du film à la popup
        const overview = document.createElement("p");
        overview.textContent = tableauEntier[i].overview;
        popup.appendChild(overview);

        // Ajoutez un bouton de fermeture à la popup
        const closeButton = document.createElement("button");
        closeButton.textContent = "Fermer";
        closeButton.style.position = "absolute";
        closeButton.style.top = "0";
        closeButton.style.right = "0";
        closeButton.addEventListener("click", () => {
          popup.remove();
        });
        popup.appendChild(closeButton); /*  */

        // Ajoutez la popup à la page
        document.body.appendChild(popup);

        // Créez une constante pour déterminer si la popup est affichée
        let popupAffichee = true;

        // Ajoutez la popup à la page
        document.body.appendChild(popup);

        // Désactivez le scroll de la page si la popup est affichée
        if (popupAffichee) {
          // Enregistrez la position actuelle de la page
          const positionPage = window.pageYOffset;

          // Désactivez le scroll en modifiant la propriété CSS "overflow" de la page
          document.body.style.overflow = "hidden";

          // Remettez la page à sa position précédente
          window.scrollTo(0, positionPage);
        }

        // Ajoutez un gestionnaire d'événements pour fermer la popup
        popup.addEventListener("click", function () {
          // Fermez la popup
          popup.style.display = "none";

          // Mettez à jour la constante pour indiquer que la popup est fermée
          popupAffichee = false;

          // Réactivez le scroll de la page
          document.body.style.overflow = "auto";
        });

        // Ajoutez un gestionnaire d'événements à la fenêtre pour réactiver le scroll lorsque la popup est fermée
        window.addEventListener("scroll", function () {
          if (!popupAffichee) {
            // Réactivez le scroll en modifiant la propriété CSS "overflow" de la page
            document.body.style.overflow = "auto";
          }
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}
getDataPopular();

/*fin de film populaire */

/* début de film les mieux notés */

async function getTopRated() {
  try {
    const response = await fetch(TopRated);
    const data = await response.json();

    const tableauEntier = data.results;

    for (let i = 0; i < tableauEntier.length; i++) {
      const div = document.createElement("div");
      document.getElementById("TopRated")?.appendChild(div);
      div.classList.add("RatedTop");
      const img = document.createElement("img");

      const imagePath = baseUrlImage + tableauEntier[i].poster_path;

      img.setAttribute("src", imagePath);
      document.querySelector(".RatedTop")?.appendChild(img);
    }
  } catch (error) {
    console.error(error);
  }
}

getTopRated();

/* fin de film les mieux notés */

/* début de film a venir */

async function getUpComing() {
  try {
    const response = await fetch(UpComing);
    const data = await response.json();

    const tableauEntier = data.results;

    for (let i = 0; i < tableauEntier.length; i++) {
      const div = document.createElement("div");
      document.getElementById("UpComing")?.appendChild(div);
      div.classList.add("ComingUp");
      const img = document.createElement("img");

      const imagePath = baseUrlImage + tableauEntier[i].poster_path;

      img.setAttribute("src", imagePath);
      document.querySelector(".ComingUp")?.appendChild(img);
    }
  } catch (error) {
    console.error(error);
  }
}

getUpComing();











