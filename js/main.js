"use strict";

/* Variables */
const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-btn');
const messageError = document.querySelector('.js-msg-error')

const series = document.querySelector('.js-series');
const favorites = document.querySelector('.js-favs');

/*Arrays*/
let seriesList = [];
let seriesFav = [];


/* Pintar lista de series*/
function renderSeriesList(listSeries) {
    series.innerHTML = '';
    for (const oneSerie of listSeries) {
        let drawSerie = '<div class="clickSerie">';
        drawSerie += `<h2 class="title">${oneSerie.show.name}</h2>`;
        if(oneSerie.show.image === null)
        {
            drawSerie += '<img class="serieImg" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
        }else{
            drawSerie += `<img class="serieImg" src=${oneSerie.show.image.medium}>`;
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

/* Relleno el array de series favoritas y lo pinto */
function addFavSerie() {
    const name = this.childNodes[0].innerHTML;
    const imgSerie = this.childNodes[1].src;
    const dataSerie = {
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
        let drawSerie = '<div>';
        drawSerie += `<h2 class="title">${favSerie.name}</h2>`;
        drawSerie += `<img class="serieImg" src=${favSerie.image}>`;
        drawSerie += '</div>';
        favorites.innerHTML += drawSerie;
    }
}

/* Evento para buscar las series en la api y las pinta */
function handleSearch(event) {
    event.preventDefault()

    const name = input.value;
    
    fetch(`//api.tvmaze.com/search/shows?q=${name}`)
    .then((response) => response.json())
    .then((dataAPI) => {
        seriesList = dataAPI;
        localStorage.setItem('show', JSON.stringify(seriesList));
        renderSeriesList(dataAPI);
    });
}

/* Ejecutar el evento click al dar al botón de buscar */
searchBtn.addEventListener('click', handleSearch);


