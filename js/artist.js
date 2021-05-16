const searchParams = location.search;
const urlParams = new URLSearchParams(searchParams);
const artistId = urlParams.get("id");

const response = fetch(`https://api.deezer.com/artist/${artistId}`)
  .then((response) => response.json())
  .then((resultFinal) => {
    console.log(resultFinal);
    let $ctnr = document.querySelector("#artist-container");
    $ctnr.innerHTML += `
      <div class="artist_desc">
        <h3>${resultFinal.name}</h3>
        <figure>
          <img src="${resultFinal.picture_medium}"/>
          <figcaption>
            <p>Nombre d'album: ${resultFinal.nb_album}</p>
            <p>Fans: ${resultFinal.nb_fan}</p>
          </figcaption>
        </figure>
        <div class="link_artist">
         <a href="${resultFinal.link}">Voir l'artiste sur deezer <i class="fas fa-eye"></i></a>
        <div>
      </div>
    `;
  })
  .catch((error) => {
    console.log(error);
    alert("There is an error here ! ");
  });
