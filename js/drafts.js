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



/* Relleno el array de series favoritas y lo pinto */
function addFavSerie() {
    const name = this.childNodes[0].innerHTML;
    const imgSerie = this.childNodes[1].childNodes[0].src;
    const dataSerie = {
        'id' : this.id,
        'name' : name,
        'image' : imgSerie,
    };
    seriesFav.push(dataSerie);
    renderSeriesFavs();
    
}


/* Pintar series favoritas*/
function renderSeriesFavs() {
    favorites.innerHTML = "";
    for (const favSerie of seriesFav) {
        let drawSerieFav = `<div id="${favSerie.id}" class="getClassFav">`;
        drawSerieFav += `<h2 class="title">${favSerie.name}</h2>`;
        if(favSerie.image === null)
        {
            drawSerieFav += '<img class="serieImg" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
            drawSerieFav += `<div class="corazon">X;</div>`;
        }else{
            drawSerieFav += `<img class="serieImg" src="${favSerie.image}">`;
            drawSerieFav += `<div class="corazon">X;</div>`;
        }
        drawSerieFav += '<button class="deleteFav">X</button>';
        drawSerieFav += '</div>';
        favorites.innerHTML += drawSerieFav;
    }
    localStorage.setItem('seriesFav', JSON.stringify(seriesFav));
    const deleteFav = document.querySelectorAll('.deleteFav');
        for (const oneDelete of deleteFav) {
            oneDelete.addEventListener('click', removeFav);
        }
}

function removeFav(event) {
    const btnDeleteFav = event.target;
    // Encuentra el div padre del botón (que contiene la serie)
    const parentSerie = btnDeleteFav.parentElement;
    // Encuentra el índice de la serie en la lista de favoritos
    const index = Array.from(favorites.children).indexOf(parentSerie);
    // Elimina la serie de la lista de favoritos
    seriesFav.splice(index, 1);
    // Elimina el div de la serie del DOM
    parentSerie.remove();
}

/* Dejo el HTML y el array vacio*/
function removeAllFavs () {
    seriesFav = [];
    favorites.innerHTML = '';
}


/* Ejecutar el evento click al dar al botón de buscar */
deleteAllFavs.addEventListener('click', removeAllFavs);

