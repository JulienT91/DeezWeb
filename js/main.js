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
          const $fav_btn = `<button id="fav_btn">ajouter / retirer des favoris</button>`; // Duration to format min:seconds
          const minutes = Math.floor(data.duration / 60);
          const seconds = data.duration - minutes * 60;
          $ctnr.innerHTML += `
            <img src="${data.album.cover_small}"
            <h3>${data.title}</h3>
            <h5>${data.artist.name} / ${data.album.title}</h5>
            <p>Durée:${minutes}min${seconds} </p>
            <div>
              <div>
                <a href="pages/title.html?id=${data.id}">Ecouter un extrait</a>
              </div>
              <div>
                <a href="pages/album.html?id=${data.album.id}">Consulter L'album</a>
              </div>
              <div>
                <a href="pages/artist.html?id=${data.artist.id}">Voir le fiche de l'artiste</a>
              </div>
              <div>
                ${$fav_btn}
              </div>
            </div>
          `;
        }
        // Local Storage part
        // watch on track_id => do not work /!\
        let track_data_id = resultFinal.data;
        for (let i = 0; i < track_data_id.length; i++) {
          let track_id = track_data_id[i].id;
          document.querySelector("#fav_btn");
          let new_data = localStorage.getItem("track_id");
          new_data = new_data ? JSON.parse(track_id) : [];
          if (new_data.includes(track_id)) {
            $fav_btn.style.cssText = "font-weight: 900; color: #e3502b"; //on remplit les cœurs au clic
          } else {
            $fav_btn.style.cssText = "font-weight: 400"; //on remplit les cœurs au clic
          }
          $fav_btn.addEventListener("click", () => {
            let newData = localStorage.getItem("track_id");

            //s'il n'y en a pas on crée un tableau | s'il y en a, on transforme la string en tableau
            newData = newData ? JSON.parse(track_id) : [];

            //on vérifie si l'id est déjà dans le tableau. si oui on l'enlève | sinon on l'ajoute
            if (newData.includes(track_id)) {
              //déjà présent : on retire + vide le cœur au clic
              newData.splice(newData.indexOf(track_id), 1);
              $fav_btn.style.cssText = "font-weight: 400";
            } else {
              //pas encore là : on push l'id + remplit le cœur au clic
              newData.push(track_id);
              $fav_btn.style.cssText = "font-weight: 900; color: #e3502b";
            }

            localStorage.setItem("track_id", JSON.stringify(newData)); //on enregistre dans localstorage
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
