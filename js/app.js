//funcion para acceder a los datos
let films = (dataFilms) => {
    dataFilms.forEach(function(element) {
        let title = element.title;
        //console.log(title)
        let episode = element.episode_id;
        //console.log(episode)
        let personaje = element.characters;
        //console.log(personaje)
        personaje.forEach(function(index) {// para que me empiece a darel index de los personajes

            fetch(index).then(function(response) { //peticion para acceder a su informacion
                    console.log(response, "personaje")
                    return response.json();
                })
                .then(function(data) { // se entra a la informacion para sacar ciertas caracteristicas
                    let name = data.name;
                    let height = data.height;
                    let mass = data.mass;
                    let hairColor = data.hair_color;
                    let skinColor = data.skin_color;
                    console.log(name, height, mass, hairColor, skinColor);
                })
                .catch(function(error) {// esto tambien es una promesa es como la funcion de error
                    console.log('hay un problema ');
                });

        });
        paintElement(title, episode, personaje)
    });
};



//funcion para pintar los elementos
const paintElement = (title, episode, personaje) => {
    let cardGroup = document.createElement("div");
    let card = document.createElement("div");
    let imgCard = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h5");
    let cardEpisode = document.createElement("p");

    cardGroup.className = "card-group col-md-3";
    card.className = "card";
    imgCard.className = "card-img-top";
    imgCard.setAttribute("src", "https://dummyimage.com/200x200/000/fff");
    cardBody.className = "card-body";
    cardTitle.className = "card-title";
    cardTitle.innerText = title;
    cardEpisode.className = "card-episode";
    cardEpisode.innerText = episode;

    card.appendChild(imgCard);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardEpisode);
    card.appendChild(cardBody);
    cardGroup.appendChild(card);

  // para poner las tarjetas
    let sectionFilms = document.getElementById("section-films");
    sectionFilms.appendChild(cardGroup);

};

//hacer peticion a la api con fetch sustituyendo ajax
fetch('https://swapi.co/api/films/').then(function(response) {
        return response.json(); //convertir a json el resultado de la peticion
  })
  .then(function(data) { //.then es una promesa y una vez obteniendo respuesta, acceder a su data

    let dataFilms = data.results
            //console.log(dataFilms);
    films(dataFilms);
  })
  .catch(function(error) { //mensaje en caso de error en la peticion
    console.log('hay un problema');
  });
