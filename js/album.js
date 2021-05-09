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
    <div>
      <h2>Album : ${resultFinal.title}</h2>
        <h3>Artiste : <a href="artist.html?id=${resultFinal.artist.id}"/>${resultFinal.artist.name}</a>
        </h3>
        <img src="${resultFinal.cover_medium}"/>
    </div>
    <div>
      <h3>Liste des tracks de cette album</h3>
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
    <div>
      <div> 
        <a href="${resultFinal.link}">Consulter l'album sur deezer</a>
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
