import apiKey from './apiKey.js';

// unsplash api
const count = 10;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
console.log(apiKey);
