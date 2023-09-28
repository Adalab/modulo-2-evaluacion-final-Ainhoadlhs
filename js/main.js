"use strict";

const input = document.querySelector('.js-input');
const search = document.querySelector('.js-btn');
const messageError = document.querySelector('.js-msg-error')

const series = document.querySelector('.js-series');
const favorites = document.querySelector('.js-favs');

let seriesList = [];
let seriesFav = [];

function searchSerie (event) {
    event.preventDefault ();
    let drawApi =  '';

    const name = input.value;
    // console.log(name);
        fetch(`//api.tvmaze.com/search/shows?q=${name}`)
        .then((response) => response.json())
        .then((data) => {
            seriesList = data;
            if (data.length === 0) {
                messageError.innerHTML = 'No hay series para mostrar';
            } else {
                messageError.innerHTML = ''; // En caso de que haya datos, borra el mensaje anterior
            }
        })

        seriesList.forEach((serie) => {
            // console.log(serie);
            drawApi+=`<div class="title"> ${serie.name} </div>
            <img src="${serie.url}" class="customImage">`;
        })
        //console.log(drawApi);
        series.innerHTML = drawApi;

}

search.addEventListener('click', searchSerie);
