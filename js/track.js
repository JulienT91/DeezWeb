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
  })
  .catch((error) => {
    console.log(error);
    alert("There is an error here ! ");
  });
