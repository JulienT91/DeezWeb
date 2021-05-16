const searchParams = location.search;
console.log(searchParams);
const urlParams = new URLSearchParams(searchParams);
const titleId = urlParams.get("id");

const response = fetch(`https://api.deezer.com/track/${titleId}`)
  .then((response) => response.json())
  .then((resultFinal) => {
    console.log(resultFinal);
    // Duration to format min:seconds
    const minutes = Math.floor(resultFinal.duration / 60);
    const seconds = resultFinal.duration - minutes * 60;
    // show track and album info
    let $title_ctnr = document.querySelector("#title-container");
    $title_ctnr.innerHTML += `
      <h3>${resultFinal.title}</h3>
      <figure class="track_container">
          <img src="${resultFinal.album.cover_small}"/>
          <figcaption>Album : <a href="${resultFinal.album.link}">${resultFinal.album.title}</a></figcaption>
      </figure>
      <div class="track_info">
        <h3>${resultFinal.title}</h3>
        <span>Durée:${minutes}Min${seconds}/Date de parution:${resultFinal.release_date}</span>
      </div>
    `;
    let $artist_info = document.querySelector("#artist-info");
    $artist_info.innerHTML += `
    <figure class="track_container">
      <img src="${resultFinal.artist.picture}"/>
      <figcaption>Artiste: <a href="${resultFinal.artist.link}">${resultFinal.artist.name}</a></figcaption>
    </figure>
    `;
    let $track_player = document.querySelector("#track-player");
    const track = resultFinal.preview;
    $track_player.innerHTML += `
    <figure>
      <figcaption>Ecouter un extrait:</figcaption>
      <audio
        controls
        src="${track}">
            Your browser does not support the
            <code>audio</code> element.
      </audio>
    </figure>
    `;
    let $button_ctr = document.querySelector("#button_ctr");
    $button_ctr.innerHTML += `
        <a href="${resultFinal.link}" class="showbtn" target="_blank">Voir le titre sur deezer</i></a>
        <button class="fav_btn" title="Ajouter aux favoris"><i class="fas fa-heartbeat"></i></button>


    `;

    //on s'occupe du bouton favori
    const $favoriteTrack = document.querySelector(".fav_btn");

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
  })
  .catch((error) => {
    console.log(error);
    alert("There is an error here ! ");
  });
