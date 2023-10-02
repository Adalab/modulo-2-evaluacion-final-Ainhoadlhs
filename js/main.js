'use strict';

/* Variables */
const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-btn');
const messageError = document.querySelector('.js-msg-error')

const series = document.querySelector('.js-series');
const favorites = document.querySelector('.js-favs');

const deleteAllFavs = document.querySelector('.js-delete-all');

/*Arrays*/
let seriesList = [];
let seriesFav = [];

let seriesFavLS = JSON.parse(localStorage.getItem('favLS'));
if (seriesFavLS !== null){
    seriesFav = seriesFavLS;
    renderSeriesFavs();
};

/* Evento para buscar las series en la api y las pinta */
function handleSearch(event) {
    event.preventDefault()

    const name = input.value;
    
    fetch(`//api.tvmaze.com/search/shows?q=${name}`)
    .then((response) => response.json())
    .then((dataAPI) => {
        seriesList = dataAPI;
        renderSeriesList(dataAPI);
    });
    }

/* Pintar lista de series*/
function renderSeriesList(listSeries) {
    series.innerHTML = '';
    for (const oneSerie of listSeries) {
        let drawSerie = `<div id="${oneSerie.show.id}" class="clickSerie contenedor-imagen getAllFav">`;
        drawSerie += `<h2 class="title">${oneSerie.show.name}</h2>`;
        if(oneSerie.show.image === null){
            drawSerie += '<div class="imagen-hover"><img class="serieImg" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
            drawSerie += `<div class="corazon">&#10084;</div></div>`;
        }else{
            drawSerie += `<div class="imagen-hover"><img class="serieImg" src=${oneSerie.show.image.medium}>`;
            drawSerie += `<div class="corazon">&#10084;</div></div>`;
        }
        drawSerie += '</div>';
        series.innerHTML += drawSerie;
    }
        /* Como al empezar el JS no existe la clase 'clickSerie' lo que hacemos aquí es añadirle el click */
        const allDivs = document.querySelectorAll('.clickSerie');

        for(const oneDiv of allDivs) {
            oneDiv.addEventListener('click', addFavSerie);
        }
}
function addFavSerie() {
    const serieDiv = this;
    const isFavorite = serieDiv.classList.contains('favorite');
    if (!isFavorite) {
      serieDiv.classList.add('favorite'); // Agregar la clase 'favorite'
        const name = serieDiv.querySelector('.title').textContent;
        const imgSerie = serieDiv.querySelector('.serieImg').src;
        const dataSerie = {
        id: serieDiv.id,
        name: name,
        image: imgSerie,
    };
        seriesFav.push(dataSerie);
    } else {
        serieDiv.classList.remove('favorite');
        const idToRemove = serieDiv.id;
        const indexToRemove = seriesFav.findIndex((serie) => serie.id === idToRemove);
        if (indexToRemove !== -1) {
        seriesFav.splice(indexToRemove, 1);
        }
    }
    renderSeriesFavs();
}


/* Pintar series favoritas*/
function renderSeriesFavs() {
    favorites.innerHTML = "";
    for (const favSerie of seriesFav) {
        let drawSerieFav = `<div id="${favSerie.id}" class="clickFavorite favorite">`;
        drawSerieFav += `<h2 class="title">${favSerie.name}</h2>`;
        if(favSerie.image === null)
        {
            drawSerieFav += '<img class="serieImgFav" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
        }else{
            drawSerieFav += `<img class="serieImgFav" src="${favSerie.image}">`;
        }
        drawSerieFav += '<button class="deleteFav">X</button>';
        drawSerieFav += '</div>';
        favorites.innerHTML += drawSerieFav;
    }
    localStorage.setItem('favLS', JSON.stringify(seriesFav));
    const deleteFav = document.querySelectorAll('.deleteFav');
    for (const oneDelete of deleteFav) {
        oneDelete.addEventListener('click', removeFav);
    }
}

function removeFav(event) {
    const btnDeleteFav = event.target;
    const parentSerie = btnDeleteFav.parentElement;
    const index = Array.from(favorites.children).indexOf(parentSerie);

    seriesFav.splice(index, 1);
    parentSerie.remove();
    localStorage.setItem('favLS', JSON.stringify(seriesFav));
}

/* Dejo el HTML y el array vacio y le digo que me quite la clase para que no se marque como favorito*/
function removeAllFavs() {
    favorites.innerHTML = '';
    seriesFav.forEach((favSerie) => {
        const serieDiv = document.getElementById(favSerie.id);
        if (serieDiv) {
        serieDiv.classList.remove('favorite');
        }
    });
    seriesFav = [];
    localStorage.setItem('favLS', JSON.stringify(seriesFav));
}


/* Ejecutar el evento click al dar al botón de buscar */
searchBtn.addEventListener('click', handleSearch);
deleteAllFavs.addEventListener('click', removeAllFavs);
