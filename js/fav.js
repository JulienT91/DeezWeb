let trackList = localStorage.getItem("tracksIds");
let trackListId = JSON.parse(trackList);
console.log(trackListId);
for (let i = 0; i < trackListId.length; i++) {
  window
    .fetch(`https://api.deezer.com/track/${trackListId[i]}`) //infos de l'API
    .then((response) => response.json())
    .then((result) => {
      const favInfos = document.querySelector(".fav_container");
      favInfos.setAttribute("id", `trackLike-${i}`);
      favInfos.innerHTML = `
            <div id="trackTitle-${i}">
                <a href="title.html?id=${result.id}">${result.title}</a>
                <p>${result.artist.name}</p>
            </div>
            <span>Album</span>
        `;

      const $favoriteTrack = document.createElement("button");

      //event au clic sur le bouton
      $favoriteTrack.addEventListener("click", () => {
        let track_list = localStorage.getItem("tracksIds");
        track_list = JSON.parse(track_list);

        //suppression du localStorage
        track_list.splice(track_list.indexOf(trackListId[i]), 1);
        localStorage.setItem("tracksIds", JSON.stringify(track_list));

        //suppression du DOM
        document.querySelector(`#trackLike-${i}`).remove();
      });

      let trackLike = document.querySelector(`#trackLike-${i}`);
      let trackTitle = document.querySelector(`#trackTitle-${i}`);
      trackLike.insertBefore($favoriteTrack, trackTitle);
    });
}
