let track_id = localStorage.getItem("track_id");
let id_list = JSON.parse(track_id);

for (let i = 0; i < id_list.length; i++) {
  window
    .fetch(`https://api.deezer.com/track/${id_list[i]}`) //infos de l'API
    .then((response) => response.json())
    .then((result) => {
      //création div parent #trackLike
      const favInfos = document.createElement("div");
      favInfos.setAttribute("id", `trackLike-${i}`);

      document.querySelector("#favorites").appendChild(favInfos); //on ajoute en HTML le tableau des titres likées
      favInfos.innerHTML = `
        
            <div id="trackTitle-${i}">
                <a href="track.html?id=${result.id}">${result.title}</a>
                <p>${result.artist.name}</p>
            </div>
            <span>Album</span>
        `;

      //ajout des boutons favoris
      const $favoriteTrack = document.createElement("button");

      //event au clic sur le bouton
      $favoriteTrack.addEventListener("click", () => {
        let track_list = localStorage.getItem("tracksIds");
        track_list = JSON.parse(track_list);

        //suppression du localStorage
        track_list.splice(track_list.indexOf(id_list[i]), 1);
        localStorage.setItem("tracksIds", JSON.stringify(track_list));

        //suppression du DOM
        document.querySelector(`#trackLike-${i}`).remove();
      });

      let trackLike = document.querySelector(`#trackLike-${i}`);
      let trackTitle = document.querySelector(`#trackTitle-${i}`);
      trackLike.insertBefore($favoriteTrack, trackTitle);
    });
}
