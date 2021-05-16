const searchParams = location.search;
console.log(searchParams);
const urlParams = new URLSearchParams(searchParams);
const albumId = urlParams.get("id");

const response = fetch(`https://api.deezer.com/album/${albumId}`)
  .then((response) => response.json())
  .then((resultFinal) => {
    console.log(resultFinal);
    console.log(resultFinal.rating);
    let $ctnr = document.querySelector("#albums-container");
    let ctnrHtml = `
    <div class="album_desc">
      <h2>Album : ${resultFinal.title}</h2>
        <h3>Artiste : <a href="artist.html?id=${resultFinal.artist.id}"/>${resultFinal.artist.name} <i class="fas fa-music"></i></a>
        </h3>
        <figure>
          <img src="${resultFinal.cover_medium}"/>
          <figcaption>
            <h3>Liste des tracks de cette album</h3>
          </figcaption>
        </figure>
    </div>
    <div class="album_tracks">
    <ul>`;

    for (data of resultFinal.tracks.data) {
      console.log(data.title);
      ctnrHtml += `
        <li>${data.title}</li>
        <audio
          controls
          src="${data.preview}">
              Your browser does not support the
              <code>audio</code> element.
        </audio>
        `;
    }

    ctnrHtml += `</ul>
    </div>
    <div class="linkrank_album">
      <div> 
        <a href="${resultFinal.link}" target="_blank">Consulter l'album sur deezer<i class="fas fa-headphones"></i></a>
      </div>
      <div>Rating: ${resultFinal.rating}</div>
    </div>
    `;
    $ctnr.innerHTML = ctnrHtml;
  })
  .catch((error) => {
    console.log(error);
    alert("There is an error here ! ");
  });
