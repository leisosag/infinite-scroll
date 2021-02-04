import apiKey from './apiKey.js';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// configuracion de unsplash api
let count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// comprueba que se hayan cargado todas las imagenes
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.style.visibility = 'hidden';
    count = 10;
  }
};

// setea los atributos
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// crea el elemento de fotos y los agrega al DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // elemento contenedor
    const div = document.createElement('div');
    div.classList.add('card-container');

    // datos de la foto
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-container');

    const likes = document.createElement('p');
    likes.innerText = `❤ ${photo.likes}`;
    likes.classList.add('likes');

    const username = document.createElement('a');
    username.innerText = `📸 ${photo.user.instagram_username}`;
    username.classList.add('username');
    setAttributes(username, {
      href: photo.user.links.html,
      target: '_blank',
    });

    // elemento <a> para linkear a unsplash
    const item = document.createElement('a');
    //item.setAttribute('href', photo.links.html);
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // elemento img
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // chequea si se termino de cargar todo el card
    img.addEventListener('load', imageLoaded);

    // une los elementos
    div.appendChild(item);
    iconsContainer.appendChild(likes);
    iconsContainer.appendChild(username);
    div.appendChild(iconsContainer);
    item.appendChild(img);
    imageContainer.appendChild(div);
  });
};

// trae fotos de unsplash
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

// chequea si esta al final de la pagina para cargar mas fotos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// al iniciar
getPhotos();
