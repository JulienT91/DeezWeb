// index
const searchValue = document.querySelector("#searchInput");
const optionsValue = document.querySelector("#choice");

// request part
const requestBtn = document
  .querySelector('input[type="button"]')
  .addEventListener("click", () => {
    window
      .fetch(
        `https://api.deezer.com/search?q="${
          searchValue.value
        }&order=${choiceOptions()}`
      )
      .then((response) => response.json())
      .then((resultFinal) => {
        let $ctnr = document.querySelector("#albums-list");
        for (data of resultFinal.data) {
          console.log(data);
          const $fav_btn = `<button class="fav_btn"><i class="fas fa-heartbeat"></i></button>`; // Duration to format min:seconds
          const minutes = Math.floor(data.duration / 60);
          const seconds = data.duration - minutes * 60;
          $ctnr.innerHTML += `
          <figure class="main_desc">
            <img src="${data.album.cover_medium}">
            <figcaption>
              <h3>${data.title}</h3>
              <h5>${data.artist.name} / ${data.album.title}</h5>
              <p>Durée:${minutes}min${seconds} </p>
            <figcaption>
          </figure>
          <div>
            <div class="link_main">
              <a href="pages/title.html?id=${data.id}">Ecouter un extrait <i class="fas fa-music"></i></a>
            </div>
            <div class="link_main">
              <a href="pages/album.html?id=${data.album.id}">Consulter L'album <i class="fas fa-compact-disc"></i></a>
            </div>
            <div class="link_main">
              <a href="pages/artist.html?id=${data.artist.id}">Voir le fiche de l'artiste <i class="fas fa-eye"></i></a>
            </div>
            <div class="link_main">
              ${$fav_btn}
            </div>
          </div>
          `;
        }
        // Local Storage part
        // watch on track_id => do not work /!\
        let track_data_id = resultFinal.data;
        for (let i = 0; i < track_data_id.length; i++) {
          const titleId = track_data_id[i].id;
          console.log(titleId);
          let $favoriteTrack = document.querySelector(".fav_btn");

          //on vérifie si certaines musiques sont en fav ou non
          let trackList = localStorage.getItem("tracksIds");
          trackList = trackList ? JSON.parse(trackList) : [];

          if (trackList.includes(titleId)) {
            $favoriteTrack.style.cssText = "font-weight: 900; color: #e3502b"; //on remplit les cœurs au clic
          } else {
            $favoriteTrack.style.cssText = "font-weight: 400"; //on remplit les cœurs au clic
          }

          //on fait un event au clic pour mettre des musiques en fav
          $favoriteTrack.addEventListener("click", () => {
            let track_List = localStorage.getItem("tracksIds");

            //s'il n'y en a pas on crée un tableau | s'il y en a, on transforme la string en tableau
            track_List = track_List ? JSON.parse(track_List) : [];

            //on vérifie si l'id est déjà dans le tableau. si oui on l'enlève | sinon on l'ajoute
            if (track_List.includes(titleId)) {
              //déjà présent : on retire + vide le cœur au clic
              track_List.splice(track_List.indexOf(titleId), 1);
              $favoriteTrack.style.cssText = "font-weight: 400";
            } else {
              //pas encore là : on push l'id + remplit le cœur au clic
              track_List.push(titleId);
              $favoriteTrack.style.cssText = "font-weight: 900; color: #e3502b";
            }

            localStorage.setItem("tracksIds", JSON.stringify(track_List)); //on enregistre dans localstorage
          });
        }

        const WelcomeMessage = () => "Welcome on DeezWeb ! ";
        console.log(WelcomeMessage());
      })
      .catch((error) => {
        console.log(error);
        alert("There is an error here ! ");
      });
  });
//option part
const choiceOptions = () => {
  let options = "";
  let res = optionsValue.value;
  if (res === "Album") {
    options = "ALBUM_ASC";
    console.log(options);
  }
  if (res === "Artist") {
    options = "ARTIST_ASC";
    console.log(options);
  }
  if (res === "Music") {
    options = "TRACK_ASC";
    console.log(options);
  }
  if (res === "MostPopulary") {
    options = "RANKING";
    console.log(options);
  }
  if (res === "MostRated") {
    options = "RATING_ASC";
    console.log(options);
  }
  return options;
};

document.addEventListener("change", choiceOptions);
