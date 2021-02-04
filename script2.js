import apiKey from './apiKey.js';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// configuracion de unsplash api
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// crea el elemento de fotos y los agrega al DOM
const createCard = (photo) => {
  const card = `
        <div>
            <a href="${photo.links.html}">
                <img src="${photo.urls.regular}"/>
            </a>
        </div>
    `;

  imageContainer.insertAdjacentHTML('beforeend', card);
};

// itera sobre el array de fotos
const displayPhotos = (photosArray) => {
  photosArray.map((photo) => createCard(photo));
};

// trae fotos de unsplash
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    return photosArray;
  } catch (error) {
    console.log(error);
  }
};

// al iniciar
const start = async () => {
  photosArray = await getPhotos();
  displayPhotos(photosArray);
};
window.onload = start();

// elemento <a> para linkear a unsplash
/*
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    // elemento img
    const img = document.createElement('img');
    img.setAttribute('href', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    */

/*const item = `
        <div>
            <a href=${photo.links.html}>
                <img href=${photo.urls.regular}>
            </a>
        </div>
    `;*/

// une los elementos
//item.appendChild(img);
//imageContainer.insertAdjacentHTML('beforeend', item);
